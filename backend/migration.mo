import List "mo:core/List";
import Array "mo:core/Array";

module {
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

  type OldActor = {
    characters : List.List<Character>;
    questions : List.List<Question>;
    sessions : List.List<Session>;
  };

  type NewActor = {
    characters : List.List<Character>;
    questions : List.List<Question>;
    sessions : List.List<Session>;
  };

  public func run(old : OldActor) : NewActor {
    let filteredCharacters = old.characters.filter(
      func(c) { c.name != "Arcanus" }
    );
    let luffyCharacter : Character = {
      name = "Monkey D. Luffy";
      category = "Anime Character";
      description = "Protagonist of One Piece, captain of the Straw Hat Pirates, known for his rubber powers and iconic straw hat. Energetic, optimistic, and driven by a strong sense of justice.";
      answerPatterns = [
        ("human", "YES"),
        ("fictional", "YES"),
        ("occupation", "Pirate Captain"),
        ("gender", "Male"),
      ];
    };

    let updatedCharactersArray = filteredCharacters.toArray().concat([luffyCharacter]);
    let updatedCharacters = List.fromArray<Character>(updatedCharactersArray);
    {
      characters = updatedCharacters;
      questions = old.questions;
      sessions = old.sessions;
    };
  };
};
