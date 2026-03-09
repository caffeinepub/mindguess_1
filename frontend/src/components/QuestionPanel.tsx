interface QuestionPanelProps {
  question: string;
}

export function QuestionPanel({ question }: QuestionPanelProps) {
  return (
    <div className="mb-8 text-center">
      <div className="bg-gradient-to-r from-purple-800/40 to-pink-800/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30 shadow-lg">
        <p className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 leading-relaxed">
          {question}
        </p>
      </div>
    </div>
  );
}
