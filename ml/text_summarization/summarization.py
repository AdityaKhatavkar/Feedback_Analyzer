from transformers import T5Tokenizer, T5ForConditionalGeneration

# Initialize the T5 tokenizer and model
tokenizer = T5Tokenizer.from_pretrained("t5-small")
summarization_model = T5ForConditionalGeneration.from_pretrained("t5-small")

def summarize_text(text):
    """
    Summarizes a long text input.
    Args:
        text (str): The text to be summarized.
    Returns:
        str: The summarized text.
    """
    # Prepend "summarize:" to the input text for T5
    inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=512, truncation=True)
    
    # Generate summary
    summary_ids = summarization_model.generate(inputs, max_length=150, min_length=30, length_penalty=2.0, num_beams=4, early_stopping=True)
    
    # Decode the summary
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

