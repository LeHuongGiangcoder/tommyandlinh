import urllib.request
import json

url = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=Rosa%20Redoute%20jpg&utf8=&format=json&srlimit=1"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
data = json.loads(response.read())

title = data['query']['search'][0]['title']
print(f"Title: {title}")

# Get imageinfo
image_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json"
req2 = urllib.request.Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
resp2 = urllib.request.urlopen(req2)
data2 = json.loads(resp2.read())

pages = data2['query']['pages']
for page_id in pages:
    file_url = pages[page_id]['imageinfo'][0]['url']
    print(f"Downloading: {file_url}")
    urllib.request.urlretrieve(file_url, "public/vintage_rose.jpg")
    print("Done")
