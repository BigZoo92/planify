import os
import torch
from torch.utils.data import DataLoader, Dataset
from transformers import T5Tokenizer, T5ForConditionalGeneration, AdamW
from bs4 import BeautifulSoup  

def read_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def read_html(file_path):
    html_content = read_file(file_path)
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup.get_text()

def load_data(directory, file_extension):
    texts = []
    base_path = os.path.dirname(__file__)
    full_path = os.path.join(base_path, directory)
    print("Recherche de fichiers dans :", full_path)
    file_paths = [os.path.join(full_path, f) for f in os.listdir(full_path) if f.endswith(file_extension)]
    for path in file_paths:
        if file_extension == '.html':
            texts.append(read_html(path))
        else:
            texts.append(read_file(path))
    return texts

input_html = load_data('assets/html', '.html')
input_xml = load_data('assets/xml', '.xml')
target_ts =  ['[{"summary":"de 9am à 12pm, Site web et BDD; TP, Agenda : CELCAT Timetabler, Lieu : E57, 22 avril 2024","data":{"group":null,"notes":null,"staff":null,"date":"22/04/2024"},"start":"09:00","end":"12:00","location":"E57"},{"summary":"de 1pm à 4pm, Gestion de projet; TP, Agenda : CELCAT Timetabler, Lieu : AV2, 22 avril 2024","data":{"group":null,"notes":null,"staff":null,"date":"22/04/2024"},"start":"13:00","end":"16:00","location":"AV2"},{"summary":"de 4pm à 6pm, Usages; projet tutore, Agenda : CELCAT Timetabler, Lieu : E57; E58, 22 avril 2024","data":{"group":null,"notes":null,"staff":null,"date":"22/04/2024"},"start":"16:00","end":"18:00","location":"E57; E58"},{"summary":"de 9am à 12pm, Site web et BDD; TP, Agenda : CELCAT Timetabler, Lieu : E57, 24 avril 2024","data":{"group":null,"notes":null,"staff":null,"date":"24/04/2024"},"start":"09:00","end":"12:00","location":"E57"},{"summary":"de 1pm à 4pm, Anglais renforcé; TP, Agenda : CELCAT Timetabler, Lieu : 511, 24 avril 2024","data":{"group":null,"notes":null,"staff":null,"date":"24/04/2024"},"start":"13:00","end":"16:00","location":"511"},{"summary":"de 9am à 12pm, Site web et BDD; projet tutore, Agenda : CELCAT Timetabler, Lieu : E57; I03, 26 avril 2024","data":{"group":null,"notes":null,"staff":null,"date":"26/04/2024"},"start":"09:00","end":"12:00","location":"E57; I03"},{"summary":"de 1pm à 4pm, Cult. Artistique; CM, Agenda : CELCAT Timetabler, Aucun lieu, 26 avril 2024","data":{"group":null,"notes":null,"staff":null,"date":"26/04/2024"},"start":"13:00","end":"16:00","location":null},{"summary":"de 12:23pm à 1:53pm, Site web et BDD; TD, Agenda : CELCAT Timetabler, Lieu : E57, 27 avril 2024","data":{"group":null,"notes":null,"staff":null,"date":"27/04/2024"},"start":"12:23","end":"13:53","location":"E57"}]',
        '[{"summary":"Eng","data":{"group":null,"notes":null,"staff":null,"date":"Monday"},"start":"09:30","end":"10:20","location":null},{"summary":"Mat","data":{"group":null,"notes":null,"staff":null,"date":"Monday"},"start":"10:20","end":"11:10","location":null},{"summary":"Che","data":{"group":null,"notes":null,"staff":null,"date":"Monday"},"start":"11:10","end":"12:00","location":null},{"summary":"LAB","data":{"group":null,"notes":null,"staff":null,"date":"Monday"},"start":"12:40","end":"14:20","location":null},{"summary":"Phy","data":{"group":null,"notes":null,"staff":null,"date":"Monday"},"start":"14:20","end":"15:10","location":null},{"summary":"LAB","data":{"group":null,"notes":null,"staff":null,"date":"Tuesday"},"start":"09:30","end":"12:00","location":null},{"summary":"Eng","data":{"group":null,"notes":null,"staff":null,"date":"Tuesday"},"start":"12:40","end":"13:30","location":null},{"summary":"Che","data":{"group":null,"notes":null,"staff":null,"date":"Tuesday"},"start":"13:30","end":"14:20","location":null},{"summary":"Mat","data":{"group":null,"notes":null,"staff":null,"date":"Tuesday"},"start":"14:20","end":"15:10","location":null},{"summary":"SPORTS","data":{"group":null,"notes":null,"staff":null,"date":"Tuesday"},"start":"15:10","end":"16:00","location":null},{"summary":"Mat","data":{"group":null,"notes":null,"staff":null,"date":"Wednesday"},"start":"09:30","end":"10:20","location":null},{"summary":"Phy","data":{"group":null,"notes":null,"staff":null,"date":"Wednesday"},"start":"10:20","end":"11:10","location":null},{"summary":"Eng","data":{"group":null,"notes":null,"staff":null,"date":"Wednesday"},"start":"11:10","end":"12:00","location":null},{"summary":"Che","data":{"group":null,"notes":null,"staff":null,"date":"Wednesday"},"start":"12:40","end":"13:30","location":null},{"summary":"LIBRARY","data":{"group":null,"notes":null,"staff":null,"date":"Wednesday"},"start":"13:30","end":"16:00","location":null},{"summary":"Phy","data":{"group":null,"notes":null,"staff":null,"date":"Thursday"},"start":"09:30","end":"10:20","location":null},{"summary":"Eng","data":{"group":null,"notes":null,"staff":null,"date":"Thursday"},"start":"10:20","end":"11:10","location":null},{"summary":"Che","data":{"group":null,"notes":null,"staff":null,"date":"Thursday"},"start":"11:10","end":"12:00","location":null},{"summary":"LAB","data":{"group":null,"notes":null,"staff":null,"date":"Thursday"},"start":"12:40","end":"15:10","location":null},{"summary":"Mat","data":{"group":null,"notes":null,"staff":null,"date":"Thursday"},"start":"15:10","end":"16:00","location":null},{"summary":"LAB","data":{"group":null,"notes":null,"staff":null,"date":"Friday"},"start":"09:30","end":"12:00","location":null},{"summary":"Mat","data":{"group":null,"notes":null,"staff":null,"date":"Friday"},"start":"12:40","end":"13:30","location":null},{"summary":"Che","data":{"group":null,"notes":null,"staff":null,"date":"Friday"},"start":"13:30","end":"14:20","location":null},{"summary":"Eng","data":{"group":null,"notes":null,"staff":null,"date":"Friday"},"start":"14:20","end":"15:10","location":null},{"summary":"Phy","data":{"group":null,"notes":null,"staff":null,"date":"Friday"},"start":"15:10","end":"16:00","location":null},{"summary":"Eng","data":{"group":null,"notes":null,"staff":null,"date":"Saturday"},"start":"09:30","end":"10:20","location":null},{"summary":"Che","data":{"group":null,"notes":null,"staff":null,"date":"Saturday"},"start":"10:20","end":"11:10","location":null},{"summary":"Mat","data":{"group":null,"notes":null,"staff":null,"date":"Saturday"},"start":"11:10","end":"12:00","location":null},{"summary":"SEMINAR","data":{"group":null,"notes":null,"staff":null,"date":"Saturday"},"start":"12:40","end":"15:10","location":null},{"summary":"SPORTS","data":{"group":null,"notes":null,"staff":null,"date":"Saturday"},"start":"15:10","end":"16:00","location":null}]',
        '[{"summary":"Prod. disp. inter. DWA (09:00-12:00)","data":{"group":"MMI3-FA-DW","notes":"","staff":"Ben Amor Soufian","date":"22/04/2024"},"start":"09:00","end":"12:00","location":"I03"},{"summary":"Prod. disp. inter. DWA (13:00-18:00)","data":{"group":"MMI3-FA-DW","notes":"","staff":"Ben Amor Soufian","date":"22/04/2024"},"start":"13:00","end":"18:00","location":"I03"},{"summary":"Prod. disp. inter. DWA (09:00-12:00)","data":{"group":"MMI3-FA-DW","notes":"","staff":"Ben Amor Soufian","date":"22/04/2024"},"start":"09:00","end":"12:00","location":"I03"},{"summary":"Prod. disp. inter. DWA (13:00-17:00)","data":{"group":"MMI3-FA-DW","notes":"","staff":"Ben Amor Soufian","date":"22/04/2024"},"start":"13:00","end":"17:00","location":"I03"},{"summary":"Dispositifs inter DWA (09:00-10:00)","data":{"group":"MMI3-FA-DW","notes":"","staff":"Verdier Colin","date":"22/04/2024"},"start":"09:00","end":"10:00","location":"E58"},{"summary":"Dispositifs inter DWA (10:00-12:00)","data":{"group":"MMI3-FA-DW","notes":"","staff":"Verdier Colin","date":"22/04/2024"},"start":"10:00","end":"12:00","location":"E58"},{"summary":"Entrepreneuriat (13:30-16:00)","data":{"group":"MMI3-FA-DW","notes":"","staff":"Legrand Patrick","date":"22/04/2024"},"start":"13:30","end":"16:00","location":"510"},{"summary":"Dispositifs inter DWA (09:00-10:00)","data":{"group":"MMI3-FA-DW","notes":"","staff":"Verdier Colin","date":"22/04/2024"},"start":"09:00","end":"10:00","location":"E58"},{"summary":"Dispositifs inter DWA (10:00-12:00)","data":{"group":"MMI3-FA-DW","notes":"","staff":"Verdier Colin","date":"22/04/2024"},"start":"10:00","end":"12:00","location":"E58"}]',]

input_texts = input_html + input_xml

tokenizer = T5Tokenizer.from_pretrained('t5-large')
model = T5ForConditionalGeneration.from_pretrained('t5-large')

input_encodings = tokenizer(input_texts, padding=True, truncation=True, max_length=512)
target_encodings = tokenizer(target_ts, padding=True, truncation=True, max_length=512)

class TimetableDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels['input_ids'][idx])
        return item

    def __len__(self):
        return len(self.labels['input_ids'])

dataset = TimetableDataset(input_encodings, target_encodings)
loader = DataLoader(dataset, batch_size=8, shuffle=True)

optimizer = AdamW(model.parameters(), lr=5e-5)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
model.train()

for epoch in range(3):
    for batch in loader:
        optimizer.zero_grad()
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)
        outputs = model(input_ids, attention_mask=attention_mask, labels=labels)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        print(f"Loss: {loss.item()}")

model.save_pretrained('./trained_model')
tokenizer.save_pretrained('./trained_model')

print("Modèle entraîné et sauvegardé.")
