import pymongo
import pickle
from ml.text_classification.components import classification_model  # Replace with actual import paths
from text_summarization.summarization import summarized_text  # Replace with actual import path

# Initialize MongoDB client
client = pymongo.MongoClient("mongodb+srv://siddhesh112004:Siddesh$112004@cluster0.ze1s3.mongodb.net")
db = client['Feedback_Analyzer']  # Replace with your database name
feedback_collection = db['feedbacks']  # Replace with your collection name
summary_collection = db['summaries']

# Initialize your ML model
classification_model_pkl = pickle.load(open("artifacts/classification_model.pkl", "rb"))  # Ensure path is correct

def classify_feedback(feedback):
    """Classify feedback into positive, negative, or other."""
    feedback = classification_model.text_preprocessing(feedback)
    vectorized_feedback = classification_model.text_vectorization(feedback)
    result = classification_model_pkl.predict(vectorized_feedback)
    return result[0]  # Assuming `predict` returns a list of results

def summarize_feedback(feedback_list):
    """Summarize the feedback list."""
    combined_feedback = " ".join(feedback_list)
    return summarized_text(combined_feedback)  # Implement your summarization logic

def analyze_feedback():
    # Fetch feedback from the database
    feedback_data = feedback_collection.find()
    
    positive_feedback = []
    negative_feedback = []
    other_feedback = []

    # Classify each feedback
    for feedback in feedback_data:
        feedback_text = feedback['feedback']
        sentiment = classify_feedback(feedback_text)  # Assuming feedback has a 'text' field

        # Append feedback text to the appropriate list based on sentiment
        if sentiment == 'positive':
            positive_feedback.append(feedback_text)
        elif sentiment == 'negative':
            negative_feedback.append(feedback_text)
        else:
            other_feedback.append(feedback_text)

        # Update the document with the analyzed sentiment
        feedback_collection.update_one(
            {"_id": feedback['_id']},
            {"$set": {"catagry": sentiment}}
        )

    # Summarize feedback
    positive_summary = summarize_feedback(positive_feedback)
    negative_summary = summarize_feedback(negative_feedback)
    other_summary = summarize_feedback(other_feedback)

    summary_collection.insert_one({
        "goodsummary": positive_summary,
        "badsummary": negative_summary,
        "netural": other_summary
    })

    # Display summarized results
    

if __name__ == "__main__":
    analyze_feedback()
