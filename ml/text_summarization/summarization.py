from transformers import T5Tokenizer, T5ForConditionalGeneration

# Load tokenizer and summarization model
tokenizer = T5Tokenizer.from_pretrained("t5-small")
summarization_model = T5ForConditionalGeneration.from_pretrained("t5-small")

def summarize_text(text):
    inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=512, truncation=True)
    summary_ids = summarization_model.generate(inputs, max_length=150, min_length=30, length_penalty=2.0, num_beams=4, early_stopping=True)
    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)
