import csv
import json


def initiate_empty_values_key(dictionary: dict):
    for i, feature in enumerate(dictionary['features']):
        
        dictionary['features'][i]['properties']['values'] = {}


def initiate_empty_dataset_name(dictionary: dict, datasetName: str) :
    for i, feature in enumerate(dictionary['features']):

        dictionary['features'][i]['properties']['values'][f'{datasetName}'] = {} 


def get_key_value_pairs(file_path: str, not_last_element_in_row: bool):
    with open(file_path, 'r') as input_file:
        key_value_pairs = []
        # Create a CSV reader object
        reader = csv.reader(input_file)
        
        for i, row in enumerate(reader):
            if i not in (0, 1, 18):
                
                if not_last_element_in_row:
                    last_semicolon_of_first_part = row[0].rfind(';')
                    first_semicolon_of_first_part = row[0].find(';')
                    # create key-value pair and append it to array
                    key_value_pairs.append({'key': row[0][:first_semicolon_of_first_part], 'value': float(f'{row[0][last_semicolon_of_first_part+1:]}.{row[1][0]}')})
                else:
                    first_semicolon = row[0].find(';')
                    last_semicolon = row[0].rfind(';')
                    # create key-value pair and append it to array
                    key_value_pairs.append({'key': row[0][:first_semicolon], 'value': float(row[0][last_semicolon+1:] + '.' + row[1][:-1])})
                
        return key_value_pairs


def add_values_to_dictionary(dictionary: dict, year: str, datasetName: str, fileNameString: str, not_last_element_in_row: bool):
    key_value_pairs = get_key_value_pairs('../monitorIoer/states/' + fileNameString + year + '.csv', not_last_element_in_row)

    for i, feature in enumerate(dictionary['features']):

        dictionary['features'][i]['properties']['values'][f'{datasetName}'][year] = key_value_pairs[i]['value']


if __name__ == "__main__":
    with open('../states_geo.json', 'r') as file:
        combined_states_data = json.load(file)

    initiate_empty_values_key(combined_states_data)
    initiate_empty_dataset_name(combined_states_data, 'roadnetworkdensity')
    initiate_empty_dataset_name(combined_states_data, 'greenlandpercentage')
    initiate_empty_dataset_name(combined_states_data, 'woodlandpercentage')
    initiate_empty_dataset_name(combined_states_data, 'agriculturallandpercentage')
    for year in range(2008, 2023):
        add_values_to_dictionary(combined_states_data, f'{year}', 'roadnetworkdensity', 'roadnetworkdensity/roadnetworkdensity_states_', 0)
        add_values_to_dictionary(combined_states_data, f'{year}', 'greenlandpercentage', 'greenlandpercentage/greenlandpercentage_states_', 1)
        add_values_to_dictionary(combined_states_data, f'{year}', 'woodlandpercentage', 'woodlandpercentage/woodlandpercentage_states_', 1)
        add_values_to_dictionary(combined_states_data, f'{year}', 'agriculturallandpercentage', 'agriculturallandpercentage/agriculturallandpercentage_states_', 1)
    
    
    with open('combined_states.json', 'w', encoding='utf-8') as file:
        json.dump(combined_states_data, file, ensure_ascii=False)
