import React, { useState } from 'react';

export const Quiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', ''],
      correctIndex: 0,
    },
  ]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectChange = (qIndex, optIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctIndex = optIndex;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', ''],
        correctIndex: 0,
      },
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, questions });
    alert('Quiz submitted! Check console for quiz data.');
    // TODO: send to API or backend
  };

  return (
    <div className="container my-4">
      <h2>Créer un quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titre du quiz</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
            placeholder="Titre du quiz"
            required
          />
        </div>

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4 border rounded p-3">
            <div className="mb-2">
              <label className="form-label">Question #{qIndex + 1}</label>
              <input
                type="text"
                className="form-control"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Écrivez la question"
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Options</label>
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="input-group mb-1">
                  <input
                    type="text"
                    className="form-control"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, optIndex, e.target.value)
                    }
                    placeholder={`Option ${optIndex + 1}`}
                    required
                  />
                  <div className="input-group-text">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctIndex === optIndex}
                      onChange={() => handleCorrectChange(qIndex, optIndex)}
                    />
                    <span className="ms-1">✔</span>
                  </div>
                </div>
              ))}
            </div>

            {questions.length > 1 && (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeQuestion(qIndex)}
              >
                Supprimer cette question
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addQuestion}
        >
          Ajouter une question
        </button>
        <br />
        <button type="submit" className="btn btn-primary">
          Générer le quiz
        </button>
      </form>
    </div>
  );
}

