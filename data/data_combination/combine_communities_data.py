import csv
import json


def initiate_empty_values_key(dictionary: dict):
    for i, feature in enumerate(dictionary['features']):
        
        dictionary['features'][i]['properties']['values'] = {}


def initiate_empty_dataset_name(dictionary: dict, datasetName: str):
    for i, feature in enumerate(dictionary['features']):
        
        dictionary['features'][i]['properties']['values'][f'{datasetName}'] = {}


def get_key_value_pairs(file_path: str, not_last_element_in_row: bool):
    with open(file_path, 'r') as input_file:
        key_value_pairs = []
        # Create a CSV reader object
        reader = csv.reader(input_file)
        
        for i, row in enumerate(reader):
            if i not in (0, 1, 403):
                
                if not_last_element_in_row:
                    print(row[0])
                    # TODO: handle key-value-pair creation in greenland-/ and woodland percentage datasets
                else:

                    # create indicies of seperating semicolons
                    last_semicolon = row[0].rfind(';')

                    # create key-value pair and append it to array
                    key_value_pairs.append({'key': row[0].split(';', 2)[1], 'value': float(row[0][last_semicolon+1:] + '.' + row[1][:-1])})
                
        return key_value_pairs


def add_values_to_dictionary(dictionary: dict, year: str, datasetName: str, fileNameString: str, not_last_element_in_row: bool):
    key_value_pairs = get_key_value_pairs('../monitorIoer/communities/'+ fileNameString + year + '.csv', not_last_element_in_row)

    for j, key_value_pair in enumerate(key_value_pairs):
        for i, feature in enumerate(dictionary['features']):
            if(dictionary['features'][i]['properties']['ARS'] == key_value_pairs[j]['key']):
                dictionary['features'][i]['properties']['values'][f'{datasetName}'][year] = key_value_pairs[j]['value']


if __name__ == "__main__":
    with open('../communities_geo.geojson', 'r') as file:
        combined_communities_data = json.load(file)

    initiate_empty_values_key(combined_communities_data)
    initiate_empty_dataset_name(combined_communities_data, 'roadNetworkDensity')
    for year in range(2008, 2023):
        add_values_to_dictionary(combined_communities_data, f'{year}', 'roadNetworkDensity', 'roadnetworkdensity/roadnetworkdensity_communities_', 0)
    
    
    with open('combined_communities.json', 'w', encoding='utf-8') as file:
        json.dump(combined_communities_data, file, ensure_ascii=False)
