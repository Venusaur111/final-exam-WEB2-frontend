import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaCheckCircle } from "react-icons/fa";

import { getQuestions, createQuestion, deleteQuestion } from "../../api/questions";
import { Loading, EmptyState } from "../../components/UI";

const EditionQuestion = () => {
  const { id: examId } = useParams(); // Récupère l'ID de l'examen depuis l'URL /admin/exams/:id/questions

  const [content, setContent] = useState("");
  const [points, setPoints] = useState(1);
  const [choices, setChoices] = useState([
    { id: 1, content: "", isCorrect: true },
    { id: 2, content: "", isCorrect: false },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [listError, setListError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadQuestions = useCallback(async () => {
    try {
      setLoadingQuestions(true);
      setListError("");
      const data = await getQuestions(examId);
      setQuestions(Array.isArray(data) ? data : data?.questions || []);
    } catch (err) {
      setListError(err.message || "Unable to load questions.");
    } finally {
      setLoadingQuestions(false);
    }
  }, [examId]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const updateChoice = (id, value) => {
    setChoices((currentChoices) =>
      currentChoices.map((choice) =>
        choice.id === id ? { ...choice, content: value } : choice
      )
    );
  };

  const setCorrectChoice = (id) => {
    setChoices((currentChoices) =>
      currentChoices.map((choice) => ({
        ...choice,
        isCorrect: choice.id === id,
      }))
    );
  };

  const addChoice = () => {
    if (choices.length >= 6) return;

    setChoices((currentChoices) => [
      ...currentChoices,
      {
        id: Date.now(),
        content: "",
        isCorrect: false,
      },
    ]);
  };

  const removeChoice = (id) => {
    if (choices.length <= 2) return;

    setChoices((currentChoices) => {
      const choiceToRemove = currentChoices.find((choice) => choice.id === id);
      const updatedChoices = currentChoices.filter((choice) => choice.id !== id);

      if (choiceToRemove?.isCorrect && updatedChoices.length > 0) {
        return updatedChoices.map((choice, index) => ({
          ...choice,
          isCorrect: index === 0,
        }));
      }

      return updatedChoices;
    });
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!content.trim()) {
      setError("Please write a question content.");
      return;
    }

    const hasEmptyChoice = choices.some((c) => !c.content.trim());
    if (hasEmptyChoice) {
      setError("All answer choices must be filled.");
      return;
    }

    const hasCorrectChoice = choices.some((c) => c.isCorrect);
    if (!hasCorrectChoice) {
      setError("Please select at least one correct answer.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        statement: content.trim(),
        points: Number(points),
        choices: choices.map((c) => ({
          label: c.content.trim(),
          isCorrect: c.isCorrect,
        })),
      };

      await createQuestion(examId, payload);

      setSuccess("Question saved successfully!");

      setContent("");
      setPoints(1);
      setChoices([
        { id: 1, content: "", isCorrect: true },
        { id: 2, content: "", isCorrect: false },
      ]);

      await loadQuestions();
    } catch (err) {
      setError(err.message || "Unable to save the question.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (questionId) => {
    setError("");
    setSuccess("");
    setDeletingId(questionId);

    try {
      await deleteQuestion(questionId);
      setQuestions((current) => current.filter((q) => q.id !== questionId));
    } catch (err) {
      setError(err.message || "Unable to delete the question.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <Link
          to="/admin/exams"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#4E1F6E] shadow-sm transition hover:bg-slate-50 border border-slate-200"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[#4E1F6E] sm:text-2xl">
            Manage Questions
          </h1>
          <p className="text-xs text-slate-500">
            Exam ID: {examId}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-[#65DCD5] bg-[#D9FFF4] p-4 text-sm font-medium text-[#007979]">
          {success}
        </div>
      )}

      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#4E1F6E]">Question</h2>
            <p className="mt-1 text-sm text-slate-500">
              Add the question and possible answers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="points"
              className="text-sm font-medium text-[#1D546C]"
            >
              Points
            </label>

            <input
              id="points"
              type="number"
              min="1"
              value={points}
              onChange={(event) => setPoints(event.target.value)}
              className="w-20 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-semibold text-[#4E1F6E] outline-none transition focus:border-[#007979] focus:ring-2 focus:ring-[#65DCD5]/40"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="question-content"
            className="mb-2 block text-sm font-semibold text-[#1D546C]"
          >
            Question content
          </label>

          <textarea
            id="question-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your question..."
            rows="4"
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#007979] focus:bg-white focus:ring-2 focus:ring-[#65DCD5]/40"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#1D546C]">
                Answer choices
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Between 2 and 6 choices, with one correct answer.
              </p>
            </div>

            <span className="rounded-full bg-[#D9FFF4] px-3 py-1 text-xs font-semibold text-[#007979]">
              {choices.length}/6
            </span>
          </div>

          <div className="space-y-3">
            {choices.map((choice, index) => (
              <div
                key={choice.id}
                className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                  choice.isCorrect
                    ? "border-[#007979] bg-[#D9FFF4]/50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setCorrectChoice(choice.id)}
                  aria-label={`Set answer ${index + 1} as correct`}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                    choice.isCorrect
                      ? "border-[#007979] bg-[#007979] text-white"
                      : "border-slate-300 bg-white text-slate-400 hover:border-[#007979] hover:text-[#007979]"
                  }`}
                >
                  {choice.isCorrect ? "✓" : String.fromCharCode(65 + index)}
                </button>

                <input
                  type="text"
                  value={choice.content}
                  onChange={(event) =>
                    updateChoice(choice.id, event.target.value)
                  }
                  placeholder={`Answer ${index + 1}`}
                  className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => removeChoice(choice.id)}
                  disabled={choices.length <= 2}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Remove answer"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addChoice}
            disabled={choices.length >= 6}
            className="mt-4 rounded-xl border border-dashed border-[#007979] px-4 py-2.5 text-sm font-semibold text-[#007979] transition hover:bg-[#D9FFF4] disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
          >
            + Add answer
          </button>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="rounded-xl bg-[#4E1F6E] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3f1859] hover:shadow-md disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#4E1F6E]">
            Questions for this exam
          </h2>

          {!loadingQuestions && (
            <span className="rounded-full bg-[#D9FFF4] px-3 py-1 text-xs font-semibold text-[#007979]">
              {questions.length} question{questions.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {listError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {listError}
          </div>
        )}

        {loadingQuestions ? (
          <Loading />
        ) : questions.length === 0 ? (
          <EmptyState
            title="No questions yet"
            text="Questions you create above will appear here."
          />
        ) : (
          <div className="space-y-4">
            {questions.map((question, qIndex) => (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Question {qIndex + 1}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#1D546C]">
                      {question.statement}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-[#D9FFF4] px-3 py-1 text-xs font-semibold text-[#007979]">
                      {question.points} pt{question.points > 1 ? "s" : ""}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDelete(question.id)}
                      disabled={deletingId === question.id}
                      aria-label="Delete question"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {(question.choices || []).map((choice, cIndex) => (
                    <div
                      key={choice.id ?? cIndex}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                        choice.isCorrect
                          ? "border-[#007979] bg-[#D9FFF4]/50 text-[#1D546C] font-medium"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-400 border border-slate-200">
                        {String.fromCharCode(65 + cIndex)}
                      </span>
                      <span className="min-w-0 flex-1 truncate">
                        {choice.label}
                      </span>
                      {choice.isCorrect && (
                        <FaCheckCircle className="shrink-0 text-[#007979]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditionQuestion;