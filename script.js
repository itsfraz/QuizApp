    // DOM Elements
    const app = document.getElementById("app");
    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const endScreen = document.getElementById("end-screen");

    const categorySelect = document.getElementById("category-select");
    const difficultySelect = document.getElementById("difficulty-select");
    const startBtn = document.getElementById("start-btn");
    const themeToggle = document.getElementById("theme-toggle");
    const currentCategory = document.getElementById("current-category");

    const questionNumberEl = document.getElementById("question-number");
    const questionBox = document.getElementById("question-box");
    const answersContainer = document.getElementById("answers-container");
    const scoreEl = document.getElementById("score");
    const timeLeftEl = document.getElementById("time-left");
    const timerProgress = document.querySelector(".timer-progress");
    const hintBox = document.getElementById("hint-box");
    const progressFill = document.getElementById("progress-fill");
    const progressPercent = document.getElementById("progress-percent");

    const resultText = document.getElementById("result-text");
    const finalScore = document.getElementById("final-score");
    const scorePercentage = document.getElementById("score-percentage");
    const summaryContainer = document.getElementById("summary-container");
    const restartBtn = document.getElementById("restart-btn");
    const backBtn = document.getElementById("back-btn");

    // State variables
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 15;
    let questions = [];
    let userAnswers = [];
    const letters = ['A', 'B', 'C', 'D'];

    // Enhanced Question Bank with hints and explanations
    const questionBank = [
      // General Knowledge
      {
        category: "General Knowledge",
        difficulty: "easy",
        question: "What is the capital of Japan?",
        correct: "Tokyo",
        answers: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"],
        hint: "This city hosted the Summer Olympics in 2021."
      },
      {
        category: "General Knowledge",
        difficulty: "easy",
        question: "Which planet is known as the Red Planet?",
        correct: "Mars",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        hint: "It is named after the Roman god of war."
    },
    {
        category: "General Knowledge",
        difficulty: "easy",
        question: "How many continents are there on Earth?",
        correct: "7",
        answers: ["5", "6", "7", "8"],
        hint: "This includes Asia, Africa, and Antarctica."
    },
    {
        category: "General Knowledge",
        difficulty: "easy",
        question: "What is the largest ocean on Earth?",
        correct: "Pacific Ocean",
        answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        hint: "This ocean covers more area than all land combined."
    },
    {
        category: "General Knowledge",
        difficulty: "easy",
        question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
        correct: "Carbon Dioxide",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
        hint: "Humans exhale this gas."
    },
    {
        category: "General Knowledge",
        difficulty: "easy",
        question: "Who wrote the play 'Romeo and Juliet'?",
        correct: "William Shakespeare",
        answers: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        hint: "He is often called England’s national poet."
    },
    {
        category: "General Knowledge",
        difficulty: "easy",
        question: "What is the smallest prime number?",
        correct: "2",
        answers: ["1", "2", "3", "5"],
        hint: "It is the only even prime number."
    },
    {
        category: "General Knowledge",
        difficulty: "easy",
        question: "In which country is the Great Pyramid of Giza located?",
        correct: "Egypt",
        answers: ["Egypt", "Mexico", "Peru", "India"],
        hint: "This country is home to the Nile River."
    },
    {
        category: "General Knowledge",
        difficulty: "easy",
        question: "Which organ pumps blood through the human body?",
        correct: "Heart",
        answers: ["Lungs", "Heart", "Liver", "Kidneys"],
        hint: "It is a muscular organ located in the chest."
    },
    {
        category: "General Knowledge",
        difficulty: "easy",
        question: "Which instrument is used to measure temperature?",
        correct: "Thermometer",
        answers: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
        hint: "It usually contains mercury or alcohol in glass."
    },
      { 
        category: "General Knowledge", 
        difficulty: "easy", 
        question: "What is the capital of France?", 
        correct: "Paris", 
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        hint: "Paris is known as the 'City of Light' and is famous for the Eiffel Tower."
      },
      {
        category: "General Knowledge",
        difficulty: "medium",
        question: "Which country is both in Europe and Asia?",
        correct: "Turkey",
        answers: ["Russia", "Turkey", "Kazakhstan", "Georgia"],
        hint: "Its largest city is Istanbul."
    },
    {
        category: "General Knowledge",
        difficulty: "medium",
        question: "What is the largest internal organ in the human body?",
        correct: "Liver",
        answers: ["Liver", "Lungs", "Heart", "Kidneys"],
        hint: "It plays a major role in detoxifying chemicals."
    },
    {
        category: "General Knowledge",
        difficulty: "medium",
        question: "Which planet has the most moons?",
        correct: "Saturn",
        answers: ["Saturn", "Jupiter", "Neptune", "Uranus"],
        hint: "It is surrounded by beautiful rings."
    },
    {
        category: "General Knowledge",
        difficulty: "medium",
        question: "Who was the first woman to win a Nobel Prize?",
        correct: "Marie Curie",
        answers: ["Marie Curie", "Rosalind Franklin", "Jane Goodall", "Ada Lovelace"],
        hint: "She won for her work on radioactivity."
    },
    {
        category: "General Knowledge",
        difficulty: "medium",
        question: "Which desert is the largest in the world?",
        correct: "Antarctic Desert",
        answers: ["Sahara Desert", "Gobi Desert", "Antarctic Desert", "Kalahari Desert"],
        hint: "It is the coldest desert."
    },
    {
        category: "General Knowledge",
        difficulty: "medium",
        question: "Which chemical element has the symbol 'Au'?",
        correct: "Gold",
        answers: ["Gold", "Silver", "Copper", "Platinum"],
        hint: "It’s highly valued for jewelry."
    },
    {
        category: "General Knowledge",
        difficulty: "medium",
        question: "In which year did World War II end?",
        correct: "1945",
        answers: ["1940", "1945", "1950", "1939"],
        hint: "It ended after the surrender of Japan."
    },
    {
        category: "General Knowledge",
        difficulty: "medium",
        question: "Which is the longest river in the world?",
        correct: "Nile River",
        answers: ["Amazon River", "Yangtze River", "Nile River", "Mississippi River"],
        hint: "It flows through Egypt and Sudan."
    },
    {
        category: "General Knowledge",
        difficulty: "medium",
        question: "Who painted the ceiling of the Sistine Chapel?",
        correct: "Michelangelo",
        answers: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
        hint: "He was also a sculptor of the statue 'David'."
    },
    {
        category: "General Knowledge",
        difficulty: "medium",
        question: "What is the capital of Canada?",
        correct: "Ottawa",
        answers: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
        hint: "It’s not the largest city in Canada."
    },
      { 
        category: "General Knowledge", 
        difficulty: "medium", 
        question: "Which planet is known as the Red Planet?", 
        correct: "Mars", 
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        hint: "This planet appears red due to iron oxide (rust) on its surface."
      },
      {
        category: "General Knowledge",
        difficulty: "hard",
        question: "What is the smallest country in the world by land area?",
        correct: "Vatican City",
        answers: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
        hint: "It is located within Rome, Italy."
    },
    {
        category: "General Knowledge",
        difficulty: "hard",
        question: "Which scientist proposed the three laws of motion?",
        correct: "Isaac Newton",
        answers: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Johannes Kepler"],
        hint: "He also discovered gravity."
    },
    {
        category: "General Knowledge",
        difficulty: "hard",
        question: "What is the main ingredient in traditional Japanese miso soup?",
        correct: "Miso paste",
        answers: ["Miso paste", "Soy sauce", "Seaweed", "Rice"],
        hint: "It’s made from fermented soybeans."
    },
    {
        category: "General Knowledge",
        difficulty: "hard",
        question: "Which is the only country to have won the FIFA World Cup five times?",
        correct: "Brazil",
        answers: ["Germany", "Brazil", "Italy", "Argentina"],
        hint: "Its national team is known as the Seleção."
    },
    {
        category: "General Knowledge",
        difficulty: "hard",
        question: "Which metal has the highest melting point?",
        correct: "Tungsten",
        answers: ["Iron", "Tungsten", "Platinum", "Titanium"],
        hint: "It is often used in light bulb filaments."
    },
    {
        category: "General Knowledge",
        difficulty: "hard",
        question: "Which ancient civilization built Machu Picchu?",
        correct: "Inca",
        answers: ["Maya", "Aztec", "Inca", "Olmec"],
        hint: "This civilization was based in modern-day Peru."
    },
    {
        category: "General Knowledge",
        difficulty: "hard",
        question: "Which is the rarest blood type in humans?",
        correct: "AB negative",
        answers: ["AB negative", "O negative", "A positive", "B negative"],
        hint: "Only about 1% of people have this type."
    },
    {
        category: "General Knowledge",
        difficulty: "hard",
        question: "What is the chemical formula for table salt?",
        correct: "NaCl",
        answers: ["NaCl", "KCl", "H2O", "CaCO3"],
        hint: "It is made of sodium and chlorine."
    },
    {
        category: "General Knowledge",
        difficulty: "hard",
        question: "Which is the longest bone in the human body?",
        correct: "Femur",
        answers: ["Femur", "Tibia", "Humerus", "Fibula"],
        hint: "It’s located in the thigh."
    },
    {
        category: "General Knowledge",
        difficulty: "hard",
        question: "Which is the oldest university in the world still operating?",
        correct: "University of al-Qarawiyyin",
        answers: ["University of Oxford", "University of Bologna", "University of al-Qarawiyyin", "Sorbonne University"],
        hint: "It is located in Morocco."
    },
      { 
        category: "General Knowledge", 
        difficulty: "hard", 
        question: "Who wrote 'The Canterbury Tales'?", 
        correct: "Geoffrey Chaucer", 
        answers: ["William Shakespeare", "Geoffrey Chaucer", "John Milton", "Charles Dickens"],
        hint: "He is often called the 'Father of English literature'."
      },
      
      // Science
       // Easy
    {
        category: "Science",
        difficulty: "easy",
        question: "What is the chemical symbol for water?",
        correct: "H2O",
        answers: ["H2O", "O2", "CO2", "HO2"],
        hint: "It contains two hydrogen atoms and one oxygen atom."
    },
    {
        category: "Science",
        difficulty: "easy",
        question: "Which planet is closest to the Sun?",
        correct: "Mercury",
        answers: ["Mercury", "Venus", "Earth", "Mars"],
        hint: "It has no moons."
    },
    {
        category: "Science",
        difficulty: "easy",
        question: "What gas do humans breathe in to survive?",
        correct: "Oxygen",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        hint: "It makes up about 21% of Earth’s atmosphere."
    },
    {
        category: "Science",
        difficulty: "easy",
        question: "What force pulls objects towards the center of the Earth?",
        correct: "Gravity",
        answers: ["Friction", "Gravity", "Magnetism", "Inertia"],
        hint: "Isaac Newton studied this force."
    },
    {
        category: "Science",
        difficulty: "easy",
        question: "Which part of the plant conducts photosynthesis?",
        correct: "Leaves",
        answers: ["Leaves", "Roots", "Stem", "Flowers"],
        hint: "They contain chlorophyll."
    },
    {
        category: "Science",
        difficulty: "easy",
        question: "What is the center of an atom called?",
        correct: "Nucleus",
        answers: ["Electron", "Proton", "Nucleus", "Neutron"],
        hint: "It contains protons and neutrons."
    },
    {
        category: "Science",
        difficulty: "easy",
        question: "What is the largest planet in our solar system?",
        correct: "Jupiter",
        answers: ["Saturn", "Earth", "Jupiter", "Mars"],
        hint: "It is famous for its Great Red Spot."
    },
    {
        category: "Science",
        difficulty: "easy",
        question: "Which organ in humans is responsible for pumping blood?",
        correct: "Heart",
        answers: ["Heart", "Lungs", "Liver", "Brain"],
        hint: "It has four chambers."
    },
    {
        category: "Science",
        difficulty: "easy",
        question: "Which animal is known as the 'King of the Jungle'?",
        correct: "Lion",
        answers: ["Tiger", "Lion", "Elephant", "Leopard"],
        hint: "It is featured in many national emblems."
    },
    {
        category: "Science",
        difficulty: "easy",
        question: "What part of the human body controls balance?",
        correct: "Inner Ear",
        answers: ["Inner Ear", "Brain", "Spinal Cord", "Eyes"],
        hint: "It contains the semicircular canals."
    },

    // Medium
    {
        category: "Science",
        difficulty: "medium",
        question: "What is the main gas found in Earth's atmosphere?",
        correct: "Nitrogen",
        answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
        hint: "It makes up about 78% of the atmosphere."
    },
    {
        category: "Science",
        difficulty: "medium",
        question: "Which vitamin is produced when the human skin is exposed to sunlight?",
        correct: "Vitamin D",
        answers: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
        hint: "It helps in calcium absorption."
    },
    {
        category: "Science",
        difficulty: "medium",
        question: "What is the powerhouse of the cell?",
        correct: "Mitochondria",
        answers: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
        hint: "It produces energy in the form of ATP."
    },
    {
        category: "Science",
        difficulty: "medium",
        question: "What is the chemical symbol for gold?",
        correct: "Au",
        answers: ["Ag", "Au", "Pt", "Gd"],
        hint: "It comes from the Latin word 'Aurum'."
    },
    {
        category: "Science",
        difficulty: "medium",
        question: "What is the speed of light in a vacuum?",
        correct: "299,792 km/s",
        answers: ["150,000 km/s", "299,792 km/s", "300,000 km/s", "350,000 km/s"],
        hint: "It is nearly 300,000 km/s."
    },
    {
        category: "Science",
        difficulty: "medium",
        question: "Which blood cells help our body fight infections?",
        correct: "White blood cells",
        answers: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
        hint: "Also known as leukocytes."
    },
    {
        category: "Science",
        difficulty: "medium",
        question: "What type of celestial body is the Sun?",
        correct: "Star",
        answers: ["Planet", "Star", "Asteroid", "Comet"],
        hint: "It is a G-type main-sequence object."
    },
    {
        category: "Science",
        difficulty: "medium",
        question: "Which scientist developed the theory of evolution by natural selection?",
        correct: "Charles Darwin",
        answers: ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Albert Einstein"],
        hint: "He wrote 'On the Origin of Species'."
    },
    {
        category: "Science",
        difficulty: "medium",
        question: "What is the boiling point of water at sea level?",
        correct: "100°C",
        answers: ["90°C", "100°C", "120°C", "80°C"],
        hint: "It is the same as 212°F."
    },
    {
        category: "Science",
        difficulty: "medium",
        question: "What is the most abundant element in the universe?",
        correct: "Hydrogen",
        answers: ["Oxygen", "Helium", "Hydrogen", "Carbon"],
        hint: "It makes up about 75% of the universe's elemental mass."
    },

    // Hard
    {
        category: "Science",
        difficulty: "hard",
        question: "What is the heaviest naturally occurring element?",
        correct: "Uranium",
        answers: ["Uranium", "Plutonium", "Osmium", "Gold"],
        hint: "Its atomic number is 92."
    },
    {
        category: "Science",
        difficulty: "hard",
        question: "Which scientist is known as the 'Father of Modern Chemistry'?",
        correct: "Antoine Lavoisier",
        answers: ["Antoine Lavoisier", "Dmitri Mendeleev", "Robert Boyle", "Joseph Priestley"],
        hint: "He named oxygen and hydrogen."
    },
    {
        category: "Science",
        difficulty: "hard",
        question: "What is the second most abundant element in the Earth's crust?",
        correct: "Silicon",
        answers: ["Oxygen", "Silicon", "Aluminum", "Iron"],
        hint: "It is used to make glass and computer chips."
    },
    {
        category: "Science",
        difficulty: "hard",
        question: "Which particle has a negative electric charge?",
        correct: "Electron",
        answers: ["Proton", "Electron", "Neutron", "Photon"],
        hint: "It orbits the nucleus of an atom."
    },
    {
        category: "Science",
        difficulty: "hard",
        question: "What is the only metal that is liquid at room temperature?",
        correct: "Mercury",
        answers: ["Gallium", "Mercury", "Cesium", "Lead"],
        hint: "Its symbol is Hg."
    },
    {
        category: "Science",
        difficulty: "hard",
        question: "What is the branch of science concerned with the study of fungi?",
        correct: "Mycology",
        answers: ["Botany", "Zoology", "Mycology", "Ecology"],
        hint: "It includes the study of mushrooms."
    },
    {
        category: "Science",
        difficulty: "hard",
        question: "Which physicist is famous for the uncertainty principle?",
        correct: "Werner Heisenberg",
        answers: ["Werner Heisenberg", "Niels Bohr", "Max Planck", "Erwin Schrödinger"],
        hint: "He was a German theoretical physicist."
    },
    {
        category: "Science",
        difficulty: "hard",
        question: "What is the term for animals that can live both on land and in water?",
        correct: "Amphibians",
        answers: ["Reptiles", "Amphibians", "Mammals", "Fish"],
        hint: "Examples include frogs and salamanders."
    },
    {
        category: "Science",
        difficulty: "hard",
        question: "What is the pH value of pure water?",
        correct: "7",
        answers: ["6", "7", "8", "9"],
        hint: "It is considered neutral."
    },
    {
        category: "Science",
        difficulty: "hard",
        question: "Which planet has the highest surface temperature in our solar system?",
        correct: "Venus",
        answers: ["Mercury", "Venus", "Mars", "Jupiter"],
        hint: "It has a thick atmosphere of carbon dioxide."
    },
      
      // Sports
       {
        category: "Sports",
        difficulty: "easy",
        question: "How many players are there in a standard football (soccer) team?",
        correct: "11",
        answers: ["9", "10", "11", "12"],
        hint: "It includes the goalkeeper."
    },
    {
        category: "Sports",
        difficulty: "easy",
        question: "In which sport is the term 'love' used?",
        correct: "Tennis",
        answers: ["Tennis", "Badminton", "Table Tennis", "Squash"],
        hint: "It means a score of zero."
    },
    {
        category: "Sports",
        difficulty: "easy",
        question: "Which country won the FIFA World Cup in 2018?",
        correct: "France",
        answers: ["Germany", "Brazil", "France", "Argentina"],
        hint: "They beat Croatia in the final."
    },
    {
        category: "Sports",
        difficulty: "easy",
        question: "What color flag is waved in Formula 1 to indicate the winner?",
        correct: "Checkered flag",
        answers: ["Red flag", "White flag", "Green flag", "Checkered flag"],
        hint: "It has black and white squares."
    },
    {
        category: "Sports",
        difficulty: "easy",
        question: "Which sport is known as 'The Gentleman's Game'?",
        correct: "Cricket",
        answers: ["Golf", "Tennis", "Cricket", "Polo"],
        hint: "It is very popular in India, England, and Australia."
    },
    {
        category: "Sports",
        difficulty: "easy",
        question: "What sport uses a puck instead of a ball?",
        correct: "Ice Hockey",
        answers: ["Ice Hockey", "Lacrosse", "Field Hockey", "Rugby"],
        hint: "It is played on ice."
    },
    {
        category: "Sports",
        difficulty: "easy",
        question: "How many rings are there on the Olympic flag?",
        correct: "5",
        answers: ["4", "5", "6", "7"],
        hint: "They represent the continents."
    },
    {
        category: "Sports",
        difficulty: "easy",
        question: "In which sport would you perform a slam dunk?",
        correct: "Basketball",
        answers: ["Volleyball", "Basketball", "Tennis", "Handball"],
        hint: "You score by putting the ball through a hoop."
    },
    {
        category: "Sports",
        difficulty: "easy",
        question: "Which country hosts the Wimbledon tennis tournament?",
        correct: "United Kingdom",
        answers: ["United States", "France", "Australia", "United Kingdom"],
        hint: "It is played on grass courts."
    },
    {
        category: "Sports",
        difficulty: "easy",
        question: "Which sport involves a pommel horse?",
        correct: "Gymnastics",
        answers: ["Gymnastics", "Equestrian", "Pole Vault", "Fencing"],
        hint: "It’s an Olympic gymnastics apparatus."
    },
    // Medium
       {
        category: "Sports",
        difficulty: "medium",
        question: "Which country has won the most FIFA World Cups?",
        correct: "Brazil",
        answers: ["Brazil", "Germany", "Italy", "Argentina"],
        hint: "They have won it 5 times."
    },
    {
        category: "Sports",
        difficulty: "medium",
        question: "In cricket, what term is used when a bowler takes three wickets in consecutive balls?",
        correct: "Hat-trick",
        answers: ["Hat-trick", "Triple Strike", "Three in a Row", "Overthrow"],
        hint: "The same term is used in football."
    },
    {
        category: "Sports",
        difficulty: "medium",
        question: "Which athlete has won the most Olympic gold medals?",
        correct: "Michael Phelps",
        answers: ["Usain Bolt", "Michael Phelps", "Larisa Latynina", "Mark Spitz"],
        hint: "He is a swimmer."
    },
    {
        category: "Sports",
        difficulty: "medium",
        question: "In basketball, how many points is a shot from behind the arc worth?",
        correct: "3",
        answers: ["1", "2", "3", "4"],
        hint: "It's called a three-pointer."
    },
    {
        category: "Sports",
        difficulty: "medium",
        question: "In which sport do players use a shuttlecock?",
        correct: "Badminton",
        answers: ["Tennis", "Badminton", "Squash", "Table Tennis"],
        hint: "It is also called a birdie."
    },
    {
        category: "Sports",
        difficulty: "medium",
        question: "Which country hosted the 2016 Summer Olympics?",
        correct: "Brazil",
        answers: ["Brazil", "China", "United Kingdom", "Japan"],
        hint: "The games were held in Rio de Janeiro."
    },
    {
        category: "Sports",
        difficulty: "medium",
        question: "In golf, what is the term for scoring one under par on a hole?",
        correct: "Birdie",
        answers: ["Birdie", "Eagle", "Bogey", "Albatross"],
        hint: "The next better score is an eagle."
    },
    {
        category: "Sports",
        difficulty: "medium",
        question: "In which sport can you get a 'spare'?",
        correct: "Bowling",
        answers: ["Bowling", "Golf", "Billiards", "Archery"],
        hint: "It involves knocking down pins."
    },
    {
        category: "Sports",
        difficulty: "medium",
        question: "What is the maximum break possible in snooker?",
        correct: "147",
        answers: ["147", "155", "140", "150"],
        hint: "It is achieved by potting reds with blacks followed by all colors."
    },
    {
        category: "Sports",
        difficulty: "medium",
        question: "Which sport uses the terms 'chukker' and 'mallet'?",
        correct: "Polo",
        answers: ["Polo", "Cricket", "Baseball", "Hockey"],
        hint: "It is played on horseback."
    },
    //Hard
       {
        category: "Sports",
        difficulty: "hard",
        question: "Which tennis player has won the most Grand Slam singles titles in history?",
        correct: "Margaret Court",
        answers: ["Serena Williams", "Margaret Court", "Steffi Graf", "Martina Navratilova"],
        hint: "She won 24 Grand Slam titles."
    },
    {
        category: "Sports",
        difficulty: "hard",
        question: "In which year was the first modern Olympic Games held?",
        correct: "1896",
        answers: ["1896", "1900", "1888", "1912"],
        hint: "It was held in Athens, Greece."
    },
    {
        category: "Sports",
        difficulty: "hard",
        question: "Which country won the first-ever Cricket World Cup in 1975?",
        correct: "West Indies",
        answers: ["Australia", "India", "West Indies", "England"],
        hint: "They defeated Australia in the final."
    },
    {
        category: "Sports",
        difficulty: "hard",
        question: "What is the diameter of a basketball hoop in inches?",
        correct: "18 inches",
        answers: ["16 inches", "18 inches", "20 inches", "22 inches"],
        hint: "It is exactly 45.72 cm."
    },
    {
        category: "Sports",
        difficulty: "hard",
        question: "Who is the only footballer to have won the World Cup three times?",
        correct: "Pelé",
        answers: ["Pelé", "Diego Maradona", "Zinedine Zidane", "Ronaldo Nazário"],
        hint: "He played for Brazil."
    },
    {
        category: "Sports",
        difficulty: "hard",
        question: "Which chess player is known as the 'Mozart of Chess'?",
        correct: "Magnus Carlsen",
        answers: ["Magnus Carlsen", "Garry Kasparov", "Bobby Fischer", "Anatoly Karpov"],
        hint: "He became World Chess Champion in 2013."
    },
    {
        category: "Sports",
        difficulty: "hard",
        question: "What is the highest possible score in a single frame of ten-pin bowling?",
        correct: "30",
        answers: ["30", "20", "25", "28"],
        hint: "It requires three consecutive strikes."
    },
    {
        category: "Sports",
        difficulty: "hard",
        question: "In Formula 1, what does the acronym DRS stand for?",
        correct: "Drag Reduction System",
        answers: ["Drag Reduction System", "Drive Racing Speed", "Downforce Regulation System", "Dynamic Racing Setup"],
        hint: "It reduces aerodynamic drag to increase speed."
    },
    {
        category: "Sports",
        difficulty: "hard",
        question: "Which country has won the most Rugby World Cups?",
        correct: "New Zealand",
        answers: ["New Zealand", "South Africa", "Australia", "England"],
        hint: "They are nicknamed the All Blacks."
    },
    {
        category: "Sports",
        difficulty: "hard",
        question: "In which sport is the Davis Cup awarded?",
        correct: "Tennis",
        answers: ["Tennis", "Badminton", "Squash", "Table Tennis"],
        hint: "It is a men's international team event."
    },
      
      // Movies
      //Easy
      {
        category: "Movies",
        difficulty: "easy",
        question: "What fictional planet is Luke Skywalker from in Star Wars?",
        correct: "Tatooine",
        answers: ["Hoth", "Endor", "Tatooine", "Coruscant"],
        hint: "It's a desert planet with twin suns where Luke lived with his aunt and uncle."
    },
    {
        category: "Movies",
        difficulty: "easy",
        question: "What type of animal is Nemo in Finding Nemo?",
        correct: "Clownfish",
        answers: ["Goldfish", "Angelfish", "Clownfish", "Blue Tang"],
        hint: "He has orange and white stripes and lives in an anemone."
    },
    {
        category: "Movies",
        difficulty: "easy",
        question: "Who directed the movie Jurassic Park (1993)?",
        correct: "Steven Spielberg",
        answers: ["James Cameron", "Steven Spielberg", "George Lucas", "Ridley Scott"],
        hint: "He also directed E.T. and Jaws."
    },
    {
        category: "Movies",
        difficulty: "easy",
        question: "What is the name of the ship that sinks in Titanic (1997)?",
        correct: "RMS Titanic",
        answers: ["SS Poseidon", "RMS Lusitania", "RMS Titanic", "HMHS Britannic"],
        hint: "The movie's title shares the ship's name."
    },
    {
        category: "Movies",
        difficulty: "easy",
        question: "What is the name of Andy's toy cowboy in Toy Story?",
        correct: "Woody",
        answers: ["Slinky", "Woody", "Rex", "Buzz"],
        hint: "He's voiced by Tom Hanks and wears a cowboy hat."
    },
    {
        category: "Movies",
        difficulty: "easy",
        question: "What iconic line does Arnold Schwarzenegger say in The Terminator?",
        correct: "I'll be back",
        answers: ["Hasta la vista, baby", "Get to the chopper!", "I'll be back", "Wax on, wax off"],
        hint: "He says it before driving a car through a police station."
    },
    {
        category: "Movies",
        difficulty: "easy",
        question: "What magical object does Dorothy need to return home in The Wizard of Oz?",
        correct: "Ruby Slippers",
        answers: ["Emerald Ring", "Silver Wand", "Ruby Slippers", "Golden Cap"],
        hint: "Glinda tells her to click their heels together three times."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "What pill does Morpheus offer Neo in The Matrix?",
        correct: "Red pill",
        answers: ["Blue pill", "Red pill", "Green pill", "Yellow pill"],
        hint: "Taking it reveals the truth about the simulated reality."
    },
    {
        category: "Movies",
        difficulty: "easy",
        question: "What superhero film features the villain Joker famously asking 'Why so serious?'",
        correct: "The Dark Knight",
        answers: ["Spider-Man", "Iron Man", "The Dark Knight", "Avengers"],
        hint: "Heath Ledger won a posthumous Oscar for this role."
    },
    {
        category: "Movies",
        difficulty: "easy",
        question: "In Harry Potter, what animal represents Gryffindor house?",
        correct: "Lion",
        answers: ["Eagle", "Badger", "Snake", "Lion"],
        hint: "It symbolizes courage and is featured on the house crest."
    },
    //Medium
      {
        category: "Movies",
        difficulty: "medium",
        question: "What 1999 film features a character saying 'The first rule of Fight Club is: You do not talk about Fight Club'?",
        correct: "Fight Club",
        answers: ["The Matrix", "American Beauty", "Fight Club", "The Boondock Saints"],
        hint: "Directed by David Fincher, starring Brad Pitt and Edward Norton."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "In The Shawshank Redemption, what does Andy Dufresne use to hide his escape tunnel?",
        correct: "A Rita Hayworth poster",
        answers: ["A Bible", "A mattress", "A Rita Hayworth poster", "A book cover"],
        hint: "He replaces this celebrity poster as the years go by."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "What year does Marty McFly travel to in Back to the Future Part II?",
        correct: "2015",
        answers: ["2020", "2010", "2015", "2035"],
        hint: "The year they predicted hoverboards would exist."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "Which actor played both Vito Corleone and Michael Corleone in The Godfather series?",
        correct: "Robert De Niro",
        answers: ["Al Pacino", "Robert De Niro", "Marlon Brando", "James Caan"],
        hint: "He played young Vito in Part II while another actor played older Michael."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "In Pulp Fiction, what does Vincent Vega overdose on?",
        correct: "Heroin",
        answers: ["Cocaine", "LSD", "Heroin", "Morphine"],
        hint: "Mia Wallace mistakes it for cocaine when snorting it."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "What is the name of the fictional sport in Rollerball (1975)?",
        correct: "Rollerball",
        answers: ["Death Derby", "Rollerball", "Speed Circuit", "Skate Wars"],
        hint: "The movie's title is the name of the sport itself."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "Which director made both 'Pan's Labyrinth' and 'The Shape of Water'?",
        correct: "Guillermo del Toro",
        answers: ["Alfonso Cuarón", "Alejandro González Iñárritu", "Guillermo del Toro", "Pedro Almodóvar"],
        hint: "Mexican director known for fantasy/horror films with creature effects."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "What is the real name of Tyler Durden in Fight Club?",
        correct: "Narrator's alternate personality",
        answers: ["Robert Paulson", "Narrator's alternate personality", "Cornelius Raymond", "Sebastian Hawk"],
        hint: "He's not a real person but a manifestation of the narrator's psyche."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "In The Matrix, what does the Oracle tell Neo is written on her kitchen wall?",
        correct: "Know Thyself",
        answers: ["Carpe Diem", "Cogito Ergo Sum", "Know Thyself", "Temet Nosce"],
        hint: "Latin phrase meaning 'know thyself'."
    },
    {
        category: "Movies",
        difficulty: "medium",
        question: "What classic film features the line 'Here's looking at you, kid'?",
        correct: "Casablanca",
        answers: ["Gone with the Wind", "Citizen Kane", "Casablanca", "The Maltese Falcon"],
        hint: "Said by Humphrey Bogart's character to Ingrid Bergman's character."
    },

    // Hard Difficulty Questions
    {
        category: "Movies",
        difficulty: "hard",
        question: "In Alfred Hitchcock's Vertigo, what color is Madeleine's car?",
        correct: "Green",
        answers: ["Red", "Blue", "Black", "Green"],
        hint: "A distinctive jade green that becomes a recurring visual motif."
    },
    {
        category: "Movies",
        difficulty: "hard",
        question: "What was the first entirely computer-animated feature film?",
        correct: "Toy Story",
        answers: ["A Bug's Life", "Toy Story", "Shrek", "Antz"],
        hint: "Pixar's groundbreaking 1995 release featuring talking toys."
    },
    {
        category: "Movies",
        difficulty: "hard",
        question: "Which Stanley Kubrick film was initially banned in several countries and withdrawn from UK distribution for 30 years?",
        correct: "A Clockwork Orange",
        answers: ["Eyes Wide Shut", "A Clockwork Orange", "The Shining", "Full Metal Jacket"],
        hint: "Features 'ultra-violence' and the Ludovico technique."
    },
    {
        category: "Movies",
        difficulty: "hard",
        question: "In Blade Runner, how many replicants does Deckard need to retire?",
        correct: "Four",
        answers: ["Three", "Four", "Five", "Six"],
        hint: "The number equals the replicants who escaped from the off-world colony."
    },
    {
        category: "Movies",
        difficulty: "hard",
        question: "What was the last film Orson Welles completed before his death?",
        correct: "F for Fake",
        answers: ["F for Fake", "The Other Side of the Wind", "Touch of Evil", "Chimes at Midnight"],
        hint: "1973 documentary-essay film about art forgery."
    },
    {
        category: "Movies",
        difficulty: "hard",
        question: "Which film contains the line: 'I have come here to chew bubblegum and kick ass... and I'm all out of bubblegum'?",
        correct: "They Live",
        answers: ["RoboCop", "Escape from New York", "They Live", "Big Trouble in Little China"],
        hint: "John Carpenter film featuring Roddy Piper fighting aliens."
    },
    {
        category: "Movies",
        difficulty: "hard",
        question: "In Goodfellas, what specific item does Jimmy Conway insist on paying for after the Lufthansa heist?",
        correct: "A fur coat for his wife",
        answers: ["Dinner at the Copa", "A fur coat for his wife", "Gambling debts", "A Cadillac"],
        hint: "This seemingly small indulgence leads to major consequences."
    },
    {
        category: "Movies",
        difficulty: "hard",
        question: "What is the name of the fictional film within the film in François Truffaut's Day for Night?",
        correct: "Meet Pamela",
        answers: ["The Burning Heart", "Meet Pamela", "Je Vous Presente Pamela", "Passionate Flame"],
        hint: "The film being made is a melodrama about a love triangle."
    },
    {
        category: "Movies",
        difficulty: "hard",
        question: "Which actor played the most screen roles in the James Bond franchise?",
        correct: "Bernard Lee",
        answers: ["Desmond Llewelyn", "Judi Dench", "Bernard Lee", "Lois Maxwell"],
        hint: "Played M from Dr. No to Moonraker (11 films)."
    },
    {
        category: "Movies",
        difficulty: "hard",
        question: "In the original Planet of the Apes, what is the name of the lawgiver who appears in the sacred scrolls?",
        correct: "Not named in the film",
        answers: ["Simos", "Armando", "Not named in the film", "Mandemus"],
        hint: "The character is only referenced indirectly through statues and texts."
    },
      { 
        category: "Movies", 
        difficulty: "hard", 
        question: "Who was the first person to win an Oscar for Best Actor in a Leading Role?", 
        correct: "Emil Jannings", 
        answers: ["Clark Gable", "Emil Jannings", "Charles Chaplin", "Douglas Fairbanks"],
        hint: "This German actor won for his performances in 'The Last Command' and 'The Way of All Flesh'."
      },
      
      // History
       // ========== EASY QUESTIONS ==========
    {
        category: "History",
        difficulty: "easy",
        question: "In which year did World War II end?",
        correct: "1945",
        answers: ["1918", "1939", "1945", "1950"],
        hint: "This year also saw the atomic bombings of Hiroshima and Nagasaki."
    },
    {
        category: "History",
        difficulty: "easy",
        question: "Who was the first President of the United States?",
        correct: "George Washington",
        answers: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
        hint: "His image appears on the one-dollar bill and the quarter coin."
    },
    {
        category: "History",
        difficulty: "easy",
        question: "Which ancient civilization built the Great Pyramids of Giza?",
        correct: "Egyptians",
        answers: ["Greeks", "Romans", "Egyptians", "Mayans"],
        hint: "Located near the Nile River in North Africa."
    },
    {
        category: "History",
        difficulty: "easy",
        question: "What was the name of the ship that brought the Pilgrims to America in 1620?",
        correct: "Mayflower",
        answers: ["Santa Maria", "Nina", "Pinta", "Mayflower"],
        hint: "This ship's passengers signed an important agreement about self-governance."
    },
    {
        category: "History",
        difficulty: "easy",
        question: "Who invented the light bulb?",
        correct: "Thomas Edison",
        answers: ["Nikola Tesla", "Alexander Graham Bell", "Thomas Edison", "Benjamin Franklin"],
        hint: "He held over 1,000 patents and also developed the phonograph."
    },
    {
        category: "History",
        difficulty: "easy",
        question: "Which empire was ruled by Julius Caesar?",
        correct: "Roman Empire",
        answers: ["Greek Empire", "Ottoman Empire", "British Empire", "Roman Empire"],
        hint: "Famous for its gladiators, aqueducts, and the phrase 'Veni, Vidi, Vici'."
    },
    {
        category: "History",
        difficulty: "easy",
        question: "What was the main cause of the Cold War?",
        correct: "Ideological differences between US and USSR",
        answers: ["Religious conflict", "Oil resources", "Territorial disputes in Asia", "Ideological differences between US and USSR"],
        hint: "Tension between capitalism and communism without direct military conflict."
    },
    {
        category: "History",
        difficulty: "easy",
        question: "Who wrote the 'I Have a Dream' speech?",
        correct: "Martin Luther King Jr.",
        answers: ["Malcolm X", "Rosa Parks", "Martin Luther King Jr.", "Frederick Douglass"],
        hint: "Delivered during the 1963 March on Washington for civil rights."
    },
    {
        category: "History",
        difficulty: "easy",
        question: "Which country gifted the Statue of Liberty to the United States?",
        correct: "France",
        answers: ["England", "Spain", "Italy", "France"],
        hint: "Given to commemorate the American Revolution and Franco-American alliance."
    },
    {
        category: "History",
        difficulty: "easy",
        question: "What ancient city was destroyed by volcanic eruption in 79 AD?",
        correct: "Pompeii",
        answers: ["Athens", "Troy", "Pompeii", "Sparta"],
        hint: "Buried under volcanic ash from Mount Vesuvius near modern Naples."
    },

    // ========== MEDIUM QUESTIONS ==========
    {
        category: "History",
        difficulty: "medium",
        question: "Who was the last Tsar of Russia?",
        correct: "Nicholas II",
        answers: ["Alexander III", "Nicholas II", "Peter the Great", "Ivan the Terrible"],
        hint: "His entire family was executed during the Russian Revolution."
    },
    {
        category: "History",
        difficulty: "medium",
        question: "What was the primary writing system of ancient Egypt?",
        correct: "Hieroglyphics",
        answers: ["Cuneiform", "Hieroglyphics", "Sanskrit", "Latin Alphabet"],
        hint: "Rosetta Stone was key to deciphering this symbolic script."
    },
    {
        category: "History",
        difficulty: "medium",
        question: "Which treaty ended World War I?",
        correct: "Treaty of Versailles",
        answers: ["Treaty of Tordesillas", "Treaty of Ghent", "Treaty of Versailles", "Treaty of Paris"],
        hint: "Signed in 1919 and imposed harsh penalties on Germany."
    },
    {
        category: "History",
        difficulty: "medium",
        question: "Who was the first woman to win a Nobel Prize?",
        correct: "Marie Curie",
        answers: ["Florence Nightingale", "Marie Curie", "Rosalind Franklin", "Mother Teresa"],
        hint: "Won for Physics (1903) and Chemistry (1911) - studied radioactivity."
    },
    {
        category: "History",
        difficulty: "medium",
        question: "Which civilization built Machu Picchu?",
        correct: "Incas",
        answers: ["Aztecs", "Mayans", "Incas", "Olmecs"],
        hint: "15th-century citadel in the Andes Mountains of Peru."
    },
    {
        category: "History",
        difficulty: "medium",
        question: "What was the main trade route between Europe and Asia in ancient times?",
        correct: "Silk Road",
        answers: ["Amber Road", "Silk Road", "Incense Route", "Trans-Saharan Route"],
        hint: "Network of trade routes connecting East and West for over 1,500 years."
    },
    {
        category: "History",
        difficulty: "medium",
        question: "Who was the first explorer to circumnavigate the globe?",
        correct: "Ferdinand Magellan",
        answers: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "James Cook"],
        hint: "His expedition completed the journey, though he died during the voyage."
    },
    {
        category: "History",
        difficulty: "medium",
        question: "Which revolution began with the Storming of the Bastille?",
        correct: "French Revolution",
        answers: ["Russian Revolution", "French Revolution", "Industrial Revolution", "American Revolution"],
        hint: "Occurred on July 14, 1789 - now France's national holiday."
    },
    {
        category: "History",
        difficulty: "medium",
        question: "What ancient wonder was located in Babylon?",
        correct: "Hanging Gardens",
        answers: ["Great Pyramid", "Colossus of Rhodes", "Hanging Gardens", "Lighthouse of Alexandria"],
        hint: "Famous terraced gardens said to be built by Nebuchadnezzar II."
    },
    {
        category: "History",
        difficulty: "medium",
        question: "Who was the longest-reigning British monarch before Queen Elizabeth II?",
        correct: "Queen Victoria",
        answers: ["King George III", "Queen Victoria", "King Henry VIII", "Queen Elizabeth I"],
        hint: "Reigned during the height of the British Empire from 1837-1901."
    },

    // ========== HARD QUESTIONS ==========
    {
        category: "History",
        difficulty: "hard",
        question: "Which pharaoh's intact tomb was discovered by Howard Carter in 1922?",
        correct: "Tutankhamun",
        answers: ["Ramses II", "Cleopatra", "Tutankhamun", "Hatshepsut"],
        hint: "Known as the 'Boy King' who ruled during Egypt's 18th dynasty."
    },
    {
        category: "History",
        difficulty: "hard",
        question: "What was the original name of Istanbul before it was conquered by the Ottomans in 1453?",
        correct: "Constantinople",
        answers: ["Byzantium", "Constantinople", "Adrianople", "Smyrna"],
        hint: "Capital of the Byzantine Empire, named after Emperor Constantine."
    },
    {
        category: "History",
        difficulty: "hard",
        question: "Which ancient historian wrote 'The Histories' detailing the Greco-Persian Wars?",
        correct: "Herodotus",
        answers: ["Thucydides", "Plutarch", "Herodotus", "Xenophon"],
        hint: "Often called the 'Father of History' in Western tradition."
    },
    {
        category: "History",
        difficulty: "hard",
        question: "What was the name of the Inca empire's capital city?",
        correct: "Cusco",
        answers: ["Tenochtitlan", "Cusco", "Machu Picchu", "Tiwanaku"],
        hint: "Located in modern-day Peru, considered the navel of the Inca world."
    },
    {
        category: "History",
        difficulty: "hard",
        question: "Who was the Byzantine general who reconquered much of the former Western Roman Empire?",
        correct: "Belisarius",
        answers: ["Narses", "Belisarius", "Justinian", "Heraclius"],
        hint: "Served under Emperor Justinian I in the 6th century."
    },
    {
        category: "History",
        difficulty: "hard",
        question: "Which Enlightenment philosopher wrote 'The Social Contract'?",
        correct: "Jean-Jacques Rousseau",
        answers: ["John Locke", "Voltaire", "Montesquieu", "Jean-Jacques Rousseau"],
        hint: "Famous for the phrase 'Man is born free, and everywhere he is in chains'."
    },
    {
        category: "History",
        difficulty: "hard",
        question: "What was the name of the ancient library in Alexandria?",
        correct: "Library of Alexandria",
        answers: ["Library of Pergamum", "Library of Alexandria", "Library of Ashurbanipal", "Imperial Library of Constantinople"],
        hint: "One of the largest and most significant libraries of the ancient world."
    },
    {
        category: "History",
        difficulty: "hard",
        question: "Which treaty established the European Coal and Steel Community?",
        correct: "Treaty of Paris (1951)",
        answers: ["Treaty of Rome (1957)", "Maastricht Treaty (1992)", "Treaty of Paris (1951)", "Treaty of Lisbon (2007)"],
        hint: "Precursor to the European Union, signed by six nations."
    },
    {
        category: "History",
        difficulty: "hard",
        question: "Who was the first female prime minister of a modern European country?",
        correct: "Sirimavo Bandaranaike",
        answers: ["Margaret Thatcher", "Indira Gandhi", "Golda Meir", "Sirimavo Bandaranaike"],
        hint: "Became Prime Minister of Sri Lanka (then Ceylon) in 1960."
    },
    {
        category: "History",
        difficulty: "hard",
        question: "What ancient civilization developed the concept of zero?",
        correct: "Indian",
        answers: ["Egyptian", "Mesopotamian", "Chinese", "Indian"],
        hint: "First recorded use appears in the Bakhshali manuscript around 3rd-4th century CE."
    },
      
      // Geography
      // ========== EASY QUESTIONS ==========
    {
        category: "Geography",
        difficulty: "easy",
        question: "What is the capital of Australia?",
        correct: "Canberra",
        answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
        hint: "This purpose-built capital is located between Sydney and Melbourne."
    },
    {
        category: "Geography",
        difficulty: "easy",
        question: "Which ocean is the largest on Earth?",
        correct: "Pacific Ocean",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        hint: "Covers about one-third of the Earth's surface and contains the Mariana Trench."
    },
    {
        category: "Geography",
        difficulty: "easy",
        question: "What is the longest river in Africa?",
        correct: "Nile",
        answers: ["Congo", "Niger", "Zambezi", "Nile"],
        hint: "Historically considered the longest river in the world, flowing through 11 countries."
    },
    {
        category: "Geography",
        difficulty: "easy",
        question: "Mount Everest is located in which mountain range?",
        correct: "Himalayas",
        answers: ["Andes", "Rockies", "Alps", "Himalayas"],
        hint: "This range spans five countries including Nepal and China (Tibet)."
    },
    {
        category: "Geography",
        difficulty: "easy",
        question: "Which continent is the largest by land area?",
        correct: "Asia",
        answers: ["Africa", "North America", "Asia", "Europe"],
        hint: "Contains both the highest (Everest) and lowest (Dead Sea) points on Earth."
    },
    {
        category: "Geography",
        difficulty: "easy",
        question: "What imaginary line divides the Earth into Northern and Southern Hemispheres?",
        correct: "Equator",
        answers: ["Prime Meridian", "Tropic of Cancer", "Equator", "Tropic of Capricorn"],
        hint: "Located at 0° latitude."
    },
    {
        category: "Geography",
        difficulty: "easy",
        question: "Which country has the largest population in the world?",
        correct: "China",
        answers: ["India", "United States", "Indonesia", "China"],
        hint: "Home to the Great Wall and Terracotta Army."
    },
    {
        category: "Geography",
        difficulty: "easy",
        question: "What is the capital of Japan?",
        correct: "Tokyo",
        answers: ["Osaka", "Kyoto", "Seoul", "Tokyo"],
        hint: "One of the world's most populous metropolitan areas."
    },
    {
        category: "Geography",
        difficulty: "easy",
        question: "Which desert is the largest in the world?",
        correct: "Sahara",
        answers: ["Gobi", "Kalahari", "Arabian", "Sahara"],
        hint: "Covers most of Northern Africa."
    },
    {
        category: "Geography",
        difficulty: "easy",
        question: "Which country is known as the 'Land of the Rising Sun'?",
        correct: "Japan",
        answers: ["China", "South Korea", "Thailand", "Japan"],
        hint: "Its flag features a red circle on a white background."
    },

    // ========== MEDIUM QUESTIONS ==========
    {
        category: "Geography",
        difficulty: "medium",
        question: "Which country has the most natural lakes?",
        correct: "Canada",
        answers: ["Russia", "United States", "Finland", "Canada"],
        hint: "Contains about 20% of the world's fresh water."
    },
    {
        category: "Geography",
        difficulty: "medium",
        question: "What is the capital of New Zealand?",
        correct: "Wellington",
        answers: ["Auckland", "Christchurch", "Wellington", "Dunedin"],
        hint: "Located at the southern tip of North Island."
    },
    {
        category: "Geography",
        difficulty: "medium",
        question: "Which African country was formerly known as Abyssinia?",
        correct: "Ethiopia",
        answers: ["Eritrea", "Sudan", "Ethiopia", "Somalia"],
        hint: "Home to the rock-hewn churches of Lalibela."
    },
    {
        category: "Geography",
        difficulty: "medium",
        question: "Which sea is the saltiest natural lake and borders Israel and Jordan?",
        correct: "Dead Sea",
        answers: ["Caspian Sea", "Red Sea", "Dead Sea", "Aral Sea"],
        hint: "People float easily in this hypersaline body of water."
    },
    {
        category: "Geography",
        difficulty: "medium",
        question: "What is the largest island in the Mediterranean Sea?",
        correct: "Sicily",
        answers: ["Sardinia", "Crete", "Cyprus", "Sicily"],
        hint: "Located at the 'toe' of Italy's boot-shaped peninsula."
    },
    {
        category: "Geography",
        difficulty: "medium",
        question: "Which river forms part of the border between the United States and Mexico?",
        correct: "Rio Grande",
        answers: ["Mississippi", "Colorado", "Rio Grande", "Columbia"],
        hint: "Known as 'Río Bravo del Norte' in Mexico."
    },
    {
        category: "Geography",
        difficulty: "medium",
        question: "What is the only country that borders both the Caspian Sea and the Persian Gulf?",
        correct: "Iran",
        answers: ["Iraq", "Kazakhstan", "Turkmenistan", "Iran"],
        hint: "Historically known as Persia."
    },
    {
        category: "Geography",
        difficulty: "medium",
        question: "Which European country has the longest coastline?",
        correct: "Norway",
        answers: ["Greece", "United Kingdom", "Norway", "Italy"],
        hint: "Known for its fjords and midnight sun."
    },
    {
        category: "Geography",
        difficulty: "medium",
        question: "What is the largest country in South America by area?",
        correct: "Brazil",
        answers: ["Argentina", "Peru", "Colombia", "Brazil"],
        hint: "Home to most of the Amazon Rainforest."
    },
    {
        category: "Geography",
        difficulty: "medium",
        question: "Which strait separates Asia from North America?",
        correct: "Bering Strait",
        answers: ["Strait of Gibraltar", "Bosporus Strait", "Strait of Malacca", "Bering Strait"],
        hint: "At its narrowest point, Russia and Alaska are only 85 km apart."
    },

    // ========== HARD QUESTIONS ==========
    {
        category: "Geography",
        difficulty: "hard",
        question: "Which country has three capital cities: administrative, judicial, and legislative?",
        correct: "South Africa",
        answers: ["Chile", "South Africa", "Benin", "Bolivia"],
        hint: "Capitals are Pretoria, Bloemfontein, and Cape Town."
    },
    {
        category: "Geography",
        difficulty: "hard",
        question: "What is the only sea without coastlines?",
        correct: "Sargasso Sea",
        answers: ["Coral Sea", "Sargasso Sea", "Tasman Sea", "Sea of Galilee"],
        hint: "Defined by ocean currents in the North Atlantic Ocean."
    },
    {
        category: "Geography",
        difficulty: "hard",
        question: "Which country contains the geographic center of Europe?",
        correct: "Lithuania",
        answers: ["Poland", "Austria", "Slovakia", "Lithuania"],
        hint: "Located near the village of Purnuškės, north of Vilnius."
    },
    {
        category: "Geography",
        difficulty: "hard",
        question: "What is the deepest cave in the world?",
        correct: "Veryovkina Cave",
        answers: ["Krubera Cave", "Sarma Cave", "Veryovkina Cave", "Lamprechtsofen"],
        hint: "Located in Abkhazia, Georgia with a depth of 2,212 meters (7,257 ft)."
    },
    {
        category: "Geography",
        difficulty: "hard",
        question: "Which country has the most time zones?",
        correct: "France",
        answers: ["Russia", "United States", "United Kingdom", "France"],
        hint: "Due to its overseas territories, it spans 12 time zones."
    },
    {
        category: "Geography",
        difficulty: "hard",
        question: "What is the only continent where glaciers are currently expanding?",
        correct: "Antarctica",
        answers: ["Asia", "North America", "Europe", "Antarctica"],
        hint: "Contains about 90% of the world's ice."
    },
    {
        category: "Geography",
        difficulty: "hard",
        question: "Which river flows through the most countries?",
        correct: "Danube",
        answers: ["Nile", "Amazon", "Danube", "Rhine"],
        hint: "Flows through 10 countries including Germany, Austria, and Hungary."
    },
    {
        category: "Geography",
        difficulty: "hard",
        question: "What is the world's largest non-polar desert?",
        correct: "Sahara",
        answers: ["Arabian Desert", "Gobi Desert", "Kalahari Desert", "Sahara"],
        hint: "Covers approximately 9.2 million square kilometers across North Africa."
    },
    {
        category: "Geography",
        difficulty: "hard",
        question: "Which country has the southernmost capital city in the world?",
        correct: "New Zealand",
        answers: ["Chile", "Australia", "South Africa", "New Zealand"],
        hint: "Wellington is at 41°17′S latitude."
    },
    {
        category: "Geography",
        difficulty: "hard",
        question: "What is the only country where both the equator and the Tropic of Capricorn pass through?",
        correct: "Brazil",
        answers: ["Indonesia", "Kenya", "Brazil", "Democratic Republic of Congo"],
        hint: "This South American country also contains most of the Amazon Rainforest."
    }

    ];

    // Event Listeners
    startBtn.addEventListener("click", startQuiz);
    themeToggle.addEventListener("click", toggleTheme);
    restartBtn.addEventListener("click", restartQuiz);
    backBtn.addEventListener("click", backToStart);
    
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (quizScreen.classList.contains("hidden")) return;
      
      const answerButtons = document.querySelectorAll(".answer-btn");
      if (e.key >= "1" && e.key <= "4" && answerButtons.length >= parseInt(e.key)) {
        const index = parseInt(e.key) - 1;
        answerButtons[index].click();
      }
    });

    // Functions
    function startQuiz() {
      const category = categorySelect.value;
      const difficulty = difficultySelect.value;
      
      // Filter questions based on selected category and difficulty
      questions = questionBank.filter(q => 
        q.category === category && q.difficulty === difficulty
      );
      
      // Randomize questions
      questions = shuffleArray(questions).slice(0, 10);
      
      if (questions.length === 0) {
        alert("No questions available for this selection. Please try another category or difficulty.");
        return;
      }
      
      // Update UI
      currentCategory.textContent = category;
      startScreen.classList.add("hidden");
      quizScreen.classList.remove("hidden");
      
      // Reset state
      currentQuestionIndex = 0;
      score = 0;
      userAnswers = [];
      scoreEl.textContent = "0";
      
      // Load first question
      loadQuestion();
    }

    function loadQuestion() {
      // Reset timer
      clearInterval(timer);
      timeLeft = 15;
      timeLeftEl.textContent = timeLeft;
      timerProgress.style.strokeDashoffset = "0";
      hintBox.style.display = "none";
      
      // Get current question
      const q = questions[currentQuestionIndex];
      
      // Update question number and progress
      questionNumberEl.textContent = `Q ${currentQuestionIndex + 1} / ${questions.length}`;
      const progress = ((currentQuestionIndex) / questions.length) * 100;
      progressFill.style.width = `${progress}%`;
      progressPercent.textContent = `${Math.round(progress)}%`;
      
      // Display question
      questionBox.textContent = q.question;
      questionBox.classList.add("fade-in");
      setTimeout(() => questionBox.classList.remove("fade-in"), 500);
      
      // Display answers
      answersContainer.innerHTML = "";
      const shuffledAnswers = shuffleArray([...q.answers]);
      
      shuffledAnswers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.setAttribute("role", "button");
        btn.setAttribute("aria-label", `Answer: ${answer}`);
        btn.setAttribute("data-value", answer);
        
        btn.innerHTML = `
          <span class="answer-letter">${letters[index]}</span>
          <span class="answer-text">${answer}</span>
        `;
        
        btn.addEventListener("click", () => handleAnswerClick(answer, q.correct, btn));
        answersContainer.appendChild(btn);
      });
      
      // Start timer
      startTimer();
    }

    function startTimer() {
      timer = setInterval(() => {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;
        
        // Update timer circle
        const progress = (timeLeft / 15) * 220;
        timerProgress.style.strokeDashoffset = progress;
        
        // Change color when time is running low
        if (timeLeft <= 5) {
          timeLeftEl.style.color = "#f72585";
          timerProgress.style.stroke = "#f72585";
        }
        
        if (timeLeft <= 0) {
          clearInterval(timer);
          handleTimeOut();
        }
      }, 1000);
    }

    function handleAnswerClick(selected, correct, btn) {
      clearInterval(timer);
      
      // Disable all buttons
      const buttons = document.querySelectorAll(".answer-btn");
      buttons.forEach(b => b.disabled = true);
      
      // Record user's answer
      userAnswers.push({
        question: questions[currentQuestionIndex].question,
        selected,
        correct,
        isCorrect: selected === correct
      });
      
      // Show correct answer and mark user's selection
      buttons.forEach(b => {
        if (b.dataset.value === correct) {
          b.classList.add("correct");
        }
        if (b === btn && selected !== correct) {
          b.classList.add("incorrect");
        }
      });
      
      // Update score if correct
      if (selected === correct) {
        score += 10;
        scoreEl.textContent = score;
      }
      
      // Show hint/explanation
      hintBox.innerHTML = `<strong>Explanation:</strong> ${questions[currentQuestionIndex].hint}`;
      hintBox.style.display = "block";
      
      // Move to next question after delay
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          loadQuestion();
        } else {
          endQuiz();
        }
      }, 2500);
    }

    function handleTimeOut() {
      // Disable all buttons
      const buttons = document.querySelectorAll(".answer-btn");
      buttons.forEach(b => b.disabled = true);
      
      // Record timeout as incorrect answer
      const q = questions[currentQuestionIndex];
      userAnswers.push({
        question: q.question,
        selected: "Time Out",
        correct: q.correct,
        isCorrect: false
      });
      
      // Show correct answer
      buttons.forEach(b => {
        if (b.dataset.value === q.correct) {
          b.classList.add("correct");
        }
      });
      
      // Show hint/explanation
      hintBox.innerHTML = `<strong>Time's up!</strong> ${q.hint}`;
      hintBox.style.display = "block";
      
      // Move to next question after delay
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          loadQuestion();
        } else {
          endQuiz();
        }
      }, 2500);
    }

    function endQuiz() {
      quizScreen.classList.add("hidden");
      endScreen.classList.remove("hidden");
      
      // Calculate final score and percentage
      const maxScore = questions.length * 10;
      const percentage = Math.round((score / maxScore) * 100);
      
      finalScore.textContent = score;
      scorePercentage.textContent = percentage;
      
      // Set result message based on performance
      if (percentage >= 90) {
        resultText.textContent = "🎉 Outstanding Performance!";
        resultText.className = "result-outstanding";
        createConfetti();
      } else if (percentage >= 70) {
        resultText.textContent = "🌟 Excellent Result!";
        resultText.className = "result-great";
      } else if (percentage >= 50) {
        resultText.textContent = "👍 Good Effort!";
        resultText.className = "result-good";
      } else {
        resultText.textContent = "Keep Practicing!";
      }
      
      // Generate summary
      generateSummary();
    }

    function generateSummary() {
      summaryContainer.innerHTML = "";
      
      userAnswers.forEach((answer, index) => {
        const summaryItem = document.createElement("div");
        summaryItem.className = `summary-item ${answer.isCorrect ? "" : "incorrect"}`;
        
        summaryItem.innerHTML = `
          <div class="summary-question">${index + 1}. ${answer.question}</div>
          <div>Your answer: ${answer.selected}</div>
          <div>Correct answer: ${answer.correct}</div>
          <div class="summary-answer">
            ${answer.isCorrect ? 
              '<span class="correct-indicator">✓ Correct</span>' : 
              '<span class="incorrect-indicator">✗ Incorrect</span>'}
          </div>
        `;
        
        summaryContainer.appendChild(summaryItem);
      });
    }

    function createConfetti() {
      const colors = ["#4361ee", "#3f37c9", "#4cc9f0", "#4CAF50", "#f72585", "#f8961e"];
      
      for (let i = 0; i < 150; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
      }
    }

    function toggleTheme() {
      document.body.classList.toggle("dark-mode");
      document.body.classList.toggle("light-mode");
      
      const isDarkMode = document.body.classList.contains("dark-mode");
      themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    }

    function restartQuiz() {
      endScreen.classList.add("hidden");
      startScreen.classList.remove("hidden");
    }

    function backToStart() {
      endScreen.classList.add("hidden");
      startScreen.classList.remove("hidden");
    }

    // Utility functions
    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    // Initialize theme toggle text
    themeToggle.textContent = "Dark Mode";
  