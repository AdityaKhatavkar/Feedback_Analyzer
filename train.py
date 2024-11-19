import pandas as pd
from ml.text_classification.components.data_transformation import data_preprocessing, text_vectorization
from ml.text_classification.components.classification_model import model_trainer
from sklearn.feature_extraction.text import TfidfVectorizer
from ml.text_classification.components.data_transformation import text_preprocessing

Dataset_file_path = 'C:\\Users\\Aditya\\Desktop\\Feedback_copy\\ml\\Datasets\\Dataset-SA.csv'
X,y = data_preprocessing(Dataset_file_path)

X_tv = text_vectorization(X)


accuracy = model_trainer(X_tv,y)
print("Accuracy of the model is : ", accuracy)

