import requests


r = requests.post("http://localhost:8080/api/submit", data={"word": "simen"})
print(r.text)

