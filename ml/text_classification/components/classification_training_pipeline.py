import pandas as pd
from text_classification.components.data_transformation import data_preprocessing, text_vectorization
from text_classification.components.classification_model import model_trainer
from sklearn.feature_extraction.text import TfidfVectorizer
from text_classification.components.data_transformation import text_preprocessing

Dataset_file_path = 'E:\DataScience_projects\Feedback_analyzer\Feedback_Analyzer\server\ml\Datasets\Dataset-SA.csv'
X,y = data_preprocessing(Dataset_file_path)

X_tv = text_vectorization(X)


accuracy = model_trainer(X_tv,y)
print("Accuracy of the model is : ", accuracy)

