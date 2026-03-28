// Database from Aarogya Health AI System Instructions
const procedureData = {
    // Diagnostic Imaging
    "ct_scan": { name: "CT Scan (Head/Brain)", min: 2500, max: 9000 },
    "pet_scan": { name: "PET Scan (Whole Body)", min: 35000, max: 70000 },
    "ultrasound": { name: "Ultrasound (Abdomen/Pelvis)", min: 800, max: 3500 },
    "mri_scan": { name: "MRI Scan (Brain/Spine/Joints)", min: 3000, max: 25000 },
    
    // General Surgery
    "appendectomy": { name: "Appendectomy", min: 45000, max: 100000 },
    "cholecystectomy": { name: "Cholecystectomy (Gallbladder)", min: 42750, max: 185680 },
    "endoscopy": { name: "Endoscopy (Upper GI)", min: 2100, max: 10500 },
    "colonoscopy": { name: "Colonoscopy", min: 20000, max: 41000 },

    // Orthopedic
    "knee_replacement": { name: "Total Knee Replacement", min: 50000, max: 400000 },
    "hip_replacement": { name: "Total Hip Replacement", min: 60000, max: 800000 },

    // Ophthalmology
    "cataract": { name: "Cataract Surgery", min: 15200, max: 55000 },
    "lasik": { name: "LASIK Eye Surgery", min: 40000, max: 110000 },

    // Cardiology
    "angiography": { name: "Coronary Angiography", min: 5000, max: 210000 },
    "angioplasty": { name: "Angioplasty (PTCA)", min: 67000, max: 135000 },

    // Maternity & Fertility
    "normal_delivery": { name: "Normal Delivery", min: 28000, max: 94500 },
    "c_section": { name: "C-Section (Cesarean)", min: 56000, max: 93000 },
    "ivf": { name: "In-Vitro Fertilization (IVF)", min: 25000, max: 500000 },

    // Specialized
    "dialysis": { name: "Dialysis (Per Session)", min: 750, max: 5000 },
    "hair_transplant": { name: "Hair Transplant", min: 25000, max: 265000 },
    "gastric_bypass": { name: "Gastric Bypass Surgery", min: 50000, max: 1300000 }
};

// View Toggling Logic
function switchView(viewId) {
    document.getElementById('ai-chat-view').style.display = 'none';
    document.getElementById('live-helper-view').style.display = 'none';

    // Stop streams if leaving live-helper
    if(viewId !== 'live-helper-view') {
        if(window.companionStream) {
            window.companionStream.getTracks().forEach(track => track.stop());
            window.companionStream = null;
        }
        window.speechSynthesis.cancel();
    }

    const target = document.getElementById(viewId);
    target.style.display = 'flex';
    target.style.animation = 'none';
    void target.offsetWidth; 
    target.style.animation = 'fadeIn 0.5s ease';
}

// -------------- AI CHATBOT LOGIC --------------
function handleChatPress(e) {
    if (e.key === 'Enter') sendMessage();
}

// HealthClear System Instructions Identity Engine
async function getAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Identity Disclaimer Check (Mandatory rule: advise to consult certified medical professional)
    const disclaimer = "<br><br><i>Disclaimer: I am an AI assistant. Please consult a certified medical professional for official diagnoses, treatments, or serious health concerns.</i>";

    // 0. Time and Date Awareness
    if (msg.includes('time') || msg.includes('date') || msg.includes('today')) {
        const d = new Date();
        const dateString = d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeString = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
        return `It is currently <b>${timeString}</b> on <b>${dateString}</b>. How can I assist you with your schedule or health today?` + disclaimer;
    }

    // 1. HealthClear Hardcoded Identity Logic
    if (msg.includes('risk') || msg.includes('score') || msg.includes('calculate')) {
        return "At HealthClear, we calculate a Financial Risk Score (out of 100) based on procedure costs versus your monthly income.<br>We take the Average Minimum and Maximum Cost of your procedure, and divide it by your Monthly Income. We then multiply by 20. If it's under 15, you are in the Safe Zone. If >40, you are High Risk and should explore financial assistance!" + disclaimer;
    } 
    else if (msg.includes('cost') || msg.includes('price')) {
         return "I have HealthClear's reference pricing data active. For example, a CT Scan ranges from ₹2,500 to ₹9,000, while a Total Knee Replacement ranges from ₹50,000 to ₹4,00,000. Use the Cost Estimator tab to calculate your specific Financial Risk Score against your salary!" + disclaimer;
    }
    else if (msg.includes('dashboard') || msg.includes('healthclear')) {
        return "The HealthClear Patient Dashboard is your central hub showing metrics like Total Healthcare Spending, Active Claims, Upcoming Appointments, and your spending trends! I can help you navigate it." + disclaimer;
    }
    
    // 2. Wikipedia Search Fallback (Live Gen AI API logic)
    // Extract keywords by removing filler words to get better search terms
    const stopWords = ['what', 'is', 'a', 'the', 'tell', 'me', 'about', 'how', 'do', 'you', 'explain', 'can'];
    let searchArray = userMessage.split(' ').filter(word => !stopWords.includes(word.toLowerCase()));
    let searchQuery = searchArray.join(' ').trim();

    if (searchQuery.length < 3) {
        return "Could you provide a more specific medical term or drug name for me to look up?" + disclaimer;
    }

    try {
        // We use the public Wikipedia REST API, fetching summaries without needing a backend key
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchQuery)}`);
        
        if (!response.ok) {
            return `I couldn't find specific live medical data for "${searchQuery}". Could you check the spelling or specify if it's a medication or condition?` + disclaimer;
        }

        const data = await response.json();
        
        if (data.type === 'disambiguation') {
            return `There are multiple medical entries for "${searchQuery}". Could you please be more specific?` + disclaimer;
        }

        if (data.extract) {
            return `<b>Here is what I found on ${data.title}:</b><br>${data.extract}` + disclaimer;
        }

    } catch (error) {
        console.error("Wikipedia API fetch error:", error);
        return "I am currently unable to access my medical database to look that up due to a network error." + disclaimer;
    }

    return "I am an AI assistant integrated into the Aarogya Path ecosystem. I am designed to assist you with procedure transparency, risk calculations, and general queries." + disclaimer;
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    const chatMessages = document.getElementById('chat-messages');

    // Add user message to UI
    chatMessages.innerHTML += `
        <div class="chat-bubble chat-user">
            ${message}
        </div>
    `;
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Add typing indicator
    const typingId = 'typing-' + Date.now();
    chatMessages.innerHTML += `
        <div class="chat-bubble chat-bot" id="${typingId}">
            <i class="fa-solid fa-ellipsis fa-bounce"></i> Fetching live medical information...
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Generate AI response
    try {
        const responseText = await getAIResponse(message);
        
        // Remove typing indicator and append actual response
        document.getElementById(typingId).remove();
        chatMessages.innerHTML += `
            <div class="chat-bubble chat-bot">
                ${responseText}
            </div>
        `;
    } catch (e) {
        document.getElementById(typingId).remove();
        chatMessages.innerHTML += `
            <div class="chat-bubble chat-bot" style="color: var(--danger);">
                Sorry, something went wrong processing your request. Please try again later.
            </div>
        `;
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// -------------- LIVE ACCESSIBILITY COMPANION LOGIC --------------

// Basic speech synthesis setup
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = 0.9;
        msg.pitch = 1.1;
        window.speechSynthesis.speak(msg);
    }
}

async function startLiveCompanion() {
    try {
        document.getElementById('companion-intro').style.display = 'none';
        
        const activeContainer = document.getElementById('companion-active');
        activeContainer.style.display = 'flex';
        
        const video = document.getElementById('companion-cam');
        
        window.companionStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" }, 
            audio: false 
        });
        
        video.srcObject = window.companionStream;
        
        document.getElementById('companion-mic-text').innerText = "Hello. How can I assist you today?";
        speak("Namaste. I am your health companion. I am ready to read your medicine or connect you to a doctor. Please hold your medicine to the camera if you want me to read it.");
        
    } catch (err) {
        console.error("Camera access error:", err);
        alert("Camera permission is required to use the visual assistant feature.");
        document.getElementById('companion-intro').style.display = 'flex';
        document.getElementById('companion-active').style.display = 'none';
    }
}

function companionReadMedicine() {
    speak("Please hold the medicine steady in front of the camera. I am scanning it now.");
    document.getElementById('companion-mic-text').innerText = "Scanning Medicine...";
    document.getElementById('companion-mic-icon').classList.remove('fa-microphone');
    document.getElementById('companion-mic-icon').classList.add('fa-expand', 'fa-spin');
    
    // Show visual scanner ping
    document.getElementById('scan-overlay').style.display = 'block';

    setTimeout(() => {
        document.getElementById('scan-overlay').style.display = 'none';
        
        speak("I have identified the medicine. This is Paracetamol 500 milligram. It is primarily used to reduce fever and relieve mild to moderate pain. Please do not exceed 4000 milligrams in a single day warning: this may cause liver damage. Can I help you with anything else?");
        
        // Show result box
        document.getElementById('drug-result').style.display = 'flex';
        
        document.getElementById('companion-mic-text').innerText = "Identify complete.";
        document.getElementById('companion-mic-icon').classList.remove('fa-expand', 'fa-spin');
        document.getElementById('companion-mic-icon').classList.add('fa-check-circle');
    }, 4500); // 4.5 second simulated scan time for realism
}

function companionBookDoctor() {
    speak("I am initiating a call to the nearest available duty doctor for you immediately. Please hold the line.");
    document.getElementById('companion-mic-text').innerText = "Calling Doctor...";
    document.getElementById('companion-mic-icon').classList.remove('fa-microphone');
    document.getElementById('companion-mic-icon').classList.add('fa-phone', 'fa-shake');
    document.getElementById('companion-mic-icon').style.color = "var(--danger)";
    document.getElementById('drug-result').style.display = 'none';
    
    setTimeout(() => {
        document.getElementById('companion-mic-text').innerText = "Doctor is completely busy. Try again.";
        speak("I'm sorry, no doctors are currently available. Please try calling again in a few minutes or press emergency if you need an ambulance.");
        document.getElementById('companion-mic-icon').classList.remove('fa-shake');
    }, 5000);
}
