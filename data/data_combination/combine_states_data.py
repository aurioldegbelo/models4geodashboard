import csv
import json


def get_key_value_pairs(file_path: str):
    with open(file_path, 'r') as input_file:
        key_value_pairs = []
        # Create a CSV reader object
        reader = csv.reader(input_file)
        
        for i, row in enumerate(reader):
            if i not in (0, 1, 18):
            
                # create indicies of seperating semicolons
                first_semicolon = row[0].find(';')
                last_semicolon = row[0].rfind(';')

                # create key-value pair and append it to array
                key_value_pairs.append({'key': row[0][:first_semicolon], 'value': float(row[0][last_semicolon+1:] + '.' + row[1][:-1])})
                
        return key_value_pairs


def initiate_empty_values_key(dictonary: dict):
    for i, feature in enumerate(dictonary['features']):
        
        dictonary['features'][i]['properties']['values'] = {}


def add_values_to_dictionary(dictonary: dict, year: str):
    key_value_pairs = get_key_value_pairs('../monitorIoer/states/V03DG__' + year + '_states.csv')

    for i, feature in enumerate(dictonary['features']):

        dictonary['features'][i]['properties']['values'][year] = key_value_pairs[i]['value']


if __name__ == "__main__":
    with open('../states_geo.json', 'r') as file:
        combined_states_data_lines = json.load(file)

    initiate_empty_values_key(combined_states_data_lines)
    add_values_to_dictionary(combined_states_data_lines, '2008')
    add_values_to_dictionary(combined_states_data_lines, '2009')
    add_values_to_dictionary(combined_states_data_lines, '2010')
    add_values_to_dictionary(combined_states_data_lines, '2011')
    add_values_to_dictionary(combined_states_data_lines, '2012')
    add_values_to_dictionary(combined_states_data_lines, '2013')
    add_values_to_dictionary(combined_states_data_lines, '2014')
    add_values_to_dictionary(combined_states_data_lines, '2015')
    add_values_to_dictionary(combined_states_data_lines, '2016')
    add_values_to_dictionary(combined_states_data_lines, '2017')
    add_values_to_dictionary(combined_states_data_lines, '2018')
    add_values_to_dictionary(combined_states_data_lines, '2019')
    add_values_to_dictionary(combined_states_data_lines, '2020')
    add_values_to_dictionary(combined_states_data_lines, '2021')
    add_values_to_dictionary(combined_states_data_lines, '2022')
    
    with open('combined_states.json', 'w', encoding='utf-8') as file:
        json.dump(combined_states_data_lines, file, ensure_ascii=False)
