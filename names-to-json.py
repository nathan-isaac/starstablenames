import csv
import json

first_names = []
last_names = []

with open('data/first-names.csv') as file:
  reader = csv.reader(file)

  for row in reader:
    first_names.append(row)


with open('data/last-names.csv') as file:
  reader = csv.reader(file)

  for row in reader:
    last_names.append(row)


names = []


for first_name in first_names:
  for last_name in last_names:
    names.append({
      'first': first_name[0],
      'last': last_name[0],
    })


with open('static/data/names.json', 'w') as name_file:
  name_file.write(json.dumps(names))
