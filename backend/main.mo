import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Character = {
    name : Text;
    category : Text;
    description : Text;
    answerPatterns : [(Text, Text)];
  };

  type Question = {
    id : Text;
    questionText : Text;
    answerType : Text;
  };

  type Session = {
    sessionId : Text;
    currentQuestion : ?Text;
    remainingCandidates : [Character];
    answersSoFar : [(Text, Text)];
  };

  var characters = List.singleton<Character>(
    {
      name = "Monkey D. Luffy";
      category = "Anime Character";
      description = "Protagonist of One Piece, captain of the Straw Hat Pirates, known for his rubber powers and iconic straw hat. Energetic, optimistic, and driven by a strong sense of justice.";
      answerPatterns = [
        ("human", "YES"),
        ("fictional", "YES"),
        ("occupation", "Pirate Captain"),
        ("gender", "Male"),
      ];
    }
  );

  var questions = List.singleton<Question>(
    {
      id = "human";
      questionText = "Is the character human?";
      answerType = "boolean";
    }
  );

  let sessions = List.empty<Session>();

  public shared ({ caller }) func startGame(sessionId : Text) : async Session {
    let initialCandidates = characters.toArray();
    let session : Session = {
      sessionId;
      currentQuestion = ?"human";
      remainingCandidates = initialCandidates;
      answersSoFar = [("human", "unknown")];
    };
    sessions.add(session);
    session;
  };

  public shared ({ caller }) func answerQuestion(sessionId : Text, questionId : Text, answer : Text) : async ?Session {
    let sessionIndex = sessions.toArray().findIndex(func(s) { s.sessionId == sessionId });
    switch (sessionIndex) {
      case (null) { null };
      case (?index) {
        let session = sessions.at(index);
        let filteredCandidates = filterCandidates(session.remainingCandidates, questionId, answer);
        let updatedAnswers = session.answersSoFar.concat([(questionId, answer)]);
        let updatedSession : Session = {
          sessionId = session.sessionId;
          currentQuestion = ?questionId;
          remainingCandidates = filteredCandidates;
          answersSoFar = updatedAnswers;
        };
        sessions.put(index, updatedSession);
        ?updatedSession;
      };
    };
  };

  func filterCandidates(candidates : [Character], questionId : Text, answer : Text) : [Character] {
    candidates.filter(
      func(char) {
        let pattern = char.answerPatterns.find(func((qId, _)) { qId == questionId });
        switch (pattern) {
          case (null) { true };
          case (?p) { p.1 == answer };
        };
      }
    );
  };

  public shared ({ caller }) func addCharacter(character : Character) : async () {
    characters.add(character);
  };

  public shared ({ caller }) func addQuestion(question : Question) : async () {
    questions.add(question);
  };

  public query ({ caller }) func getNextQuestion(sessionId : Text) : async ?Question {
    let sessionValues = sessions.values().toArray();
    let session = sessionValues.find(func(s) { s.sessionId == sessionId });
    switch (session) {
      case (null) { null };
      case (?s) { getUnaskedQuestion(s.answersSoFar) };
    };
  };

  func getUnaskedQuestion(answersSoFar : [(Text, Text)]) : ?Question {
    let askedQuestionIds = answersSoFar.map(func((qId, _)) { qId });
    let questionsArray = questions.toArray();
    let unaskedQuestions = questionsArray.filter(
      func(q) {
        switch (askedQuestionIds.find(func(x) { x == q.id })) {
          case (null) { true };
          case (_) { false };
        };
      }
    );
    if (unaskedQuestions.size() > 0) {
      ?unaskedQuestions[0];
    } else {
      null;
    };
  };

  public query ({ caller }) func guessCharacter(sessionId : Text) : async ?Character {
    let sessionValues = sessions.values().toArray();
    let session = sessionValues.find(func(s) { s.sessionId == sessionId });
    switch (session) {
      case (null) { null };
      case (?s) {
        if (s.remainingCandidates.size() == 1) {
          ?s.remainingCandidates[0];
        } else {
          null;
        };
      };
    };
  };
};
