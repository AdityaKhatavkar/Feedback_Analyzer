import pandas as pd
from data_transformation import data_preprocessing
from classification_model import model_trainer

# Dataset location
Dataset_file_path = 'ml//Datasets//Dataset-SA.csv'

# Preprocess data
X, y = data_preprocessing(Dataset_file_path)

# Train the model
accuracy = model_trainer(X, y)
print("Accuracy of the model is:", accuracy)
