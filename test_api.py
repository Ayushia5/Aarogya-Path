import urllib.request
import json
import ssl

url = "https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose?noqueue=1"
data = json.dumps({
    "symptoms": ["severe headache"],
    "patientInfo": {
        "age": 35, 
        "gender": "female", 
        "medicalHistory": [], 
        "currentMedications": [], 
        "allergies": [], 
        "lifestyle": {"smoking": False, "alcohol": "none", "exercise": "none", "diet": "balanced"}
    },
    "lang": "en"
}).encode('utf-8')

req = urllib.request.Request(url, data=data, headers={
    'x-rapidapi-key': 'c4e67515bcmsh39794fdbf8ca3b1p141559jsn3997d39d3b5d',
    'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
    'content-type': 'application/json'
})
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    with urllib.request.urlopen(req, context=ctx) as response:
        print(response.read().decode('utf-8'))
except Exception as e:
    print(str(e))
