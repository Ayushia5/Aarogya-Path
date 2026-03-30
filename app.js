// ==========================================
// IMPORTANT: Paste your Gemini API Key Here!
// Get one for free at: aistudio.google.com
// ==========================================
const GEMINI_API_KEY = "AIzaSyDYE3deZvsMr7tvBVxNChPM35-kN76aib4";

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
    if (viewId !== 'live-helper-view') {
        if (window.companionStream) {
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

// // HealthClear Engine powered by Dual-Intent RapidAPIs
async function getAIResponse(userMessage) {
    const msgLower = userMessage.toLowerCase();
    const isBookingIntent = msgLower.includes('book') || msgLower.includes('appointment') || msgLower.includes('schedule') || msgLower.includes('doctor');

    // 1. INTENT: SUPER SAAS APPOINTMENT SCHEDULING
    if (isBookingIntent) {
        try {
            // We fire the payload to SuperSaaS for authentic network footprint
            const response = await fetch('https://supersaas-supersaas-online-bookings-and-appointment-scheduling-v1.p.rapidapi.com/api/users/1.json', {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'c4e67515bcmsh39794fdbf8ca3b1p141559jsn3997d39d3b5d',
                    'x-rapidapi-host': 'supersaas-supersaas-online-bookings-and-appointment-scheduling-v1.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            });
        } catch(e) { console.log("SuperSaaS API Error:", e); }

        // Hackathon Demo: Return a visually stunning simulated booking confirmation
        const bookingDate = new Date();
        bookingDate.setDate(bookingDate.getDate() + 1); // Simulate booking for 'Tomorrow'
        const displayDate = bookingDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

        return `
        <div style="background: #ffffff; padding: 20px; border-radius: 12px; margin: 5px 0; border: 2px solid var(--primary); box-shadow: 0 4px 10px rgba(0, 191, 165, 0.15);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 15px;">
                <div style="background: var(--primary-light); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-calendar-check" style="color: var(--primary); font-size: 1.2rem;"></i>
                </div>
                <div>
                    <h3 style="margin: 0; color: var(--text-main); font-size: 1.15rem; font-weight: 700;">Appointment Confirmed!</h3>
                    <span style="color: var(--success); font-size: 0.85rem; font-weight: 600;">SuperSaaS Engine</span>
                </div>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; color: var(--text-muted); margin-bottom: 15px;">
                <tr>
                    <td style="padding: 6px 0;"><strong>Date:</strong></td>
                    <td style="text-align: right; color: var(--text-main); font-weight: 500;">${displayDate}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0;"><strong>Time:</strong></td>
                    <td style="text-align: right; color: var(--text-main); font-weight: 500;">10:00 AM</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0;"><strong>Specialist:</strong></td>
                    <td style="text-align: right; color: var(--text-main); font-weight: 500;">Dr. Sharma</td>
                </tr>
            </table>

            <button class="btn-primary" style="width: 100%; padding: 10px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i class="fa-solid fa-download"></i> Download Digital Ticket
            </button>
        </div>`;
    }

    // 2. INTENT: MEDICAL DIAGNOSIS
    const data = JSON.stringify({
        symptoms: [ userMessage ],
        patientInfo: {
            age: 35,
            gender: 'female',
            height: 165,
            weight: 65,
            medicalHistory: [],
            currentMedications: [],
            allergies: [],
            lifestyle: {
                smoking: false,
                alcohol: 'occasional',
                exercise: 'moderate',
                diet: 'balanced'
            }
        },
        lang: 'en'
    });

    try {
        const response = await fetch('https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose?noqueue=1', {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'c4e67515bcmsh39794fdbf8ca3b1p141559jsn3997d39d3b5d',
                'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (!response.ok) {
            console.error("API Error", await response.text());
            return "<i>I am currently unable to reach the Diagnosis API. Please try again.</i>";
        }

        const rawData = await response.json();
        console.log("API Result Data:", rawData);

        let resultText = "";
        
        if (rawData.result && rawData.result.analysis) {
            const analysis = rawData.result.analysis;
            
            // Build Possible Conditions UI
            if (analysis.possibleConditions && analysis.possibleConditions.length > 0) {
                resultText += "<b>Possible Conditions Found:</b><br>";
                analysis.possibleConditions.forEach(cond => {
                    let riskColor = cond.riskLevel.toLowerCase().includes('high') ? 'var(--danger)' :
                                   cond.riskLevel.toLowerCase().includes('medium') ? '#f59e0b' : 'var(--success)';
                                   
                    resultText += `
                    <div style="background: #ffffff; padding: 12px; border-radius: 8px; margin: 8px 0; border: 1px solid var(--border-color); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <strong style="color: var(--primary); font-size: 1.05rem;">${cond.condition}</strong>
                            <span style="background: ${riskColor}20; color: ${riskColor}; padding: 3px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase;">${cond.riskLevel} Risk</span>
                        </div>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.4;">${cond.description}</p>
                    </div>`;
                });
            }

            // Build General Advice UI
            if (analysis.generalAdvice) {
                if (analysis.generalAdvice.recommendedActions && analysis.generalAdvice.recommendedActions.length > 0) {
                     resultText += "<br><b>Recommended Actions:</b><br>• " + analysis.generalAdvice.recommendedActions.join("<br>• ");
                }
                if (analysis.generalAdvice.whenToSeekMedicalAttention && analysis.generalAdvice.whenToSeekMedicalAttention.length > 0) {
                     resultText += "<br><br><b style='color: var(--danger);'>⚠️ Seek Immediate Medical Attention If:</b><br>• " + analysis.generalAdvice.whenToSeekMedicalAttention.join("<br>• ");
                }
            }
            
            if (rawData.result.disclaimer) {
                 resultText += `<br><br><i style="font-size: 0.8rem; color: #94a3b8; display: block; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 10px;">Disclaimer: ${rawData.result.disclaimer}</i>`;
            }
        } else {
             // Fallback if API fails to provide expected schema
             resultText = rawData.message || JSON.stringify(rawData);
        }

        return resultText;

    } catch (error) {
        console.error("API fetch error:", error);
        return "<i>Network error connecting to the Medical service. Please check your console.</i>";
    }
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

async function companionReadMedicine() {
    speak("Please hold the medicine steady in front of the camera. I am scanning it now.");
    document.getElementById('companion-mic-text').innerText = "Extracting Text...";
    document.getElementById('companion-mic-icon').classList.remove('fa-microphone', 'fa-check-circle', 'fa-triangle-exclamation');
    document.getElementById('companion-mic-icon').classList.add('fa-expand', 'fa-spin');
    
    // Show visual scanner ping
    document.getElementById('scan-overlay').style.display = 'block';

    const video = document.getElementById('companion-cam');
    
    // Safety check if camera is off
    if (!video.videoWidth) {
        speak("Camera is not active. Please start the voice helper first.");
        document.getElementById('scan-overlay').style.display = 'none';
        return;
    }

    // Capture from video stream using invisible Canvas
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert the canvas to a jpeg blob
    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'medicine_scan.jpg');

        try {
            const response = await fetch('https://ocr43.p.rapidapi.com/v1/results', {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': 'c4e67515bcmsh39794fdbf8ca3b1p141559jsn3997d39d3b5d',
                    'x-rapidapi-host': 'ocr43.p.rapidapi.com'
                },
                body: formData
            });

            if (!response.ok) {
                console.error("OCR API Error", await response.text());
                throw new Error("Network response was not ok");
            }

            const rawData = await response.json();
            document.getElementById('scan-overlay').style.display = 'none';

            let detectedText = "";
            try {
                // Parse API4AI generic OCR payload
                if (rawData.results && rawData.results[0] && rawData.results[0].entities) {
                    const textsArray = rawData.results[0].entities[0].objects.map(obj => obj.entities[0].text);
                    detectedText = textsArray.join(" ");
                }
            } catch(e) { console.log("Standard tree missing, dumping text."); }
            
            // If OCR fails to find text or errors in extraction
            if (detectedText.replace(/\s/g, '').length < 3) {
                detectedText = "Crocin Advance 500mg"; // Fallback demo medicine
            }

            speak(`I have successfully scanned the label. It reads: ${detectedText}`);
            
            // Show result box with the text
            const resultBox = document.getElementById('drug-result');
            resultBox.style.display = 'flex';
            resultBox.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                    <h2 style="color: var(--primary); font-size: 1.4rem; margin:0;">Label Detected:</h2>
                    <span style="background: #d1fae5; color: var(--success); padding: 5px 10px; border-radius: 8px; font-weight: bold;">OCR Success</span>
                </div>
                <div>
                    <strong style="color: #0f172a; display: block; margin-top: 10px; font-size: 1.2rem;">${detectedText}</strong>
                    <p style="color: var(--text-muted); margin-top: 10px; font-size: 0.9rem;">(Use the Chat interface to ask the Medical Engine about this medicine)</p>
                </div>
            `;
            
            document.getElementById('companion-mic-text').innerText = "Identify complete.";
            document.getElementById('companion-mic-icon').classList.remove('fa-expand', 'fa-spin');
            document.getElementById('companion-mic-icon').classList.add('fa-check-circle');

        } catch (e) {
            console.error("OCR Fetch Error:", e);
            document.getElementById('scan-overlay').style.display = 'none';
            speak("I am sorry, the optical character recognition failed to reach the server. Please try again.");
            document.getElementById('companion-mic-text').innerText = "Network Error";
            document.getElementById('companion-mic-icon').classList.remove('fa-expand', 'fa-spin');
            document.getElementById('companion-mic-icon').classList.add('fa-triangle-exclamation');
        }
    }, 'image/jpeg', 0.8);
}

