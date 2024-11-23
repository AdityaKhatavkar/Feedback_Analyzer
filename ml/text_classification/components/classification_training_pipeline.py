import pandas as pd
from data_transformation import data_preprocessing
from classification_model import model_trainer

# Dataset location
#Dataset link kaggle : https://www.kaggle.com/datasets/niraliivaghani/flipkart-product-customer-reviews-dataset
Dataset_file_path = 'ml\\Datasets\\Dataset-SA.xlsx'

# Preprocess data
X, y = data_preprocessing(Dataset_file_path)
print("x type ->", type(X))
print("y type ->", type(y))

# Train the model
accuracy = model_trainer(X, y)
print("Accuracy of the model is:", accuracy)
