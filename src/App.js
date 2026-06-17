import React, { useState, useEffect } from 'react';

function App() {
  const [isStarted, setIsStarted] = useState(() => {
    return localStorage.getItem('isStarted') === 'true';
  });

  const [name, setName] = useState(() => localStorage.getItem('name') || '');
  const [age, setAge] = useState(() => localStorage.getItem('age') || '');
  const [gender, setGender] = useState(() => localStorage.getItem('gender') || 'Male');
  const [weight, setWeight] = useState(() => localStorage.getItem('weight') || '');
  const [height, setHeight] = useState(() => localStorage.getItem('height') || '');
  const [trainingType, setTrainingType] = useState(() => localStorage.getItem('trainingType') || 'Cardio');
  const [days, setDays] = useState(() => localStorage.getItem('days') || '');
  const [hours, setHours] = useState(() => localStorage.getItem('hours') || '');

  const [bmi, setBmi] = useState(() => localStorage.getItem('bmi') || null);
  const [water, setWater] = useState(() => localStorage.getItem('water') || null);
  const [protein, setProtein] = useState(() => localStorage.getItem('protein') || null);
  const [fitnessLevel, setFitnessLevel] = useState(() => localStorage.getItem('fitnessLevel') || '');
  const [healthMessage, setHealthMessage] = useState(() => localStorage.getItem('healthMessage') || '');
  
  const [dietPlan, setDietPlan] = useState(() => {
    const savedDiet = localStorage.getItem('dietPlan');
    return savedDiet ? JSON.parse(savedDiet) : null;
  });

  const [workoutPlan, setWorkoutPlan] = useState(() => {
    const savedWorkout = localStorage.getItem('workoutPlan');
    return savedWorkout ? JSON.parse(savedWorkout) : null;
  });
  
  const [showResults, setShowResults] = useState(() => {
    return localStorage.getItem('showResults') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isStarted', isStarted);
    localStorage.setItem('name', name);
    localStorage.setItem('age', age);
    localStorage.setItem('gender', gender);
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('trainingType', trainingType);
    localStorage.setItem('days', days);
    localStorage.setItem('hours', hours);
    localStorage.setItem('bmi', bmi || '');
    localStorage.setItem('water', water || '');
    localStorage.setItem('protein', protein || '');
    localStorage.setItem('fitnessLevel', fitnessLevel);
    localStorage.setItem('healthMessage', healthMessage);
    localStorage.setItem('dietPlan', dietPlan ? JSON.stringify(dietPlan) : '');
    localStorage.setItem('workoutPlan', workoutPlan ? JSON.stringify(workoutPlan) : '');
    localStorage.setItem('showResults', showResults);
  }, [isStarted, name, age, gender, weight, height, trainingType, days, hours, bmi, water, protein, fitnessLevel, healthMessage, dietPlan, workoutPlan, showResults]);

  const calculateHealth = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const d = parseInt(days);
    const hrs = parseInt(hours);

    if (!name || isNaN(w) || isNaN(h) || isNaN(age)) {
      alert("Please enter all data correctly!");
      return;
    }

    if (w <= 10 || w > 300 || h <= 0.5 || h > 2.5 || age < 15 || age > 80) {
      alert("Please enter realistic logical values!");
      return;
    }

    const calculatedBmi = w / (h * h);
    setBmi(calculatedBmi.toFixed(2));
    setWater((w * 0.033).toFixed(2));
    setProtein((w * 0.7).toFixed(1));

    if (d >= 5 && hrs >= 1) {
      setFitnessLevel("Advanced (Champion! 🏆)");
    } else {
      setFitnessLevel("Beginner (Keep going! 💪)");
    }

    if (calculatedBmi > 25) {
      setHealthMessage("Warning: Your BMI is high! You need a calorie deficit diet and more Cardio.");
      setDietPlan({
        title: "Weight Loss & Cutting Plan",
        breakfast: "3 Boiled egg whites + 50g Cottage cheese + Quarter of whole wheat bread.",
        lunch: "150g Grilled chicken breast + 5 tbsp of boiled rice + Large green salad.",
        snack: "1 Apple or a handful of raw almonds.",
        dinner: "1 Cup of low-fat yogurt + 1 Cucumber."
      });
    } else if (calculatedBmi < 18.5) {
      setHealthMessage("Notice: Your BMI is low. You need a calorie surplus diet and Bodybuilding.");
      setDietPlan({
        title: "Weight Gain & Bulking Plan",
        breakfast: "4 Whole eggs + 4 tbsp of fava beans with olive oil + 1 Whole flatbread.",
        lunch: "200g Minced beef or fish + Large plate of rice + Mashed potatoes.",
        snack: "Banana milk smoothie with 1 tbsp of honey & peanut butter.",
        dinner: "Oatmeal bowl with whole milk, banana, and mixed nuts."
      });
    } else {
      setHealthMessage("Your BMI is perfect! Keep up your current healthy lifestyle.");
      setDietPlan({
        title: "Balanced Weight Maintenance Plan",
        breakfast: "2 Boiled eggs + 50g Cottage cheese + Quarter of flatbread.",
        lunch: "Sautéed vegetables + 150g Grilled chicken or fish + 6 tbsp of boiled rice.",
        snack: "1 Cup of Green tea + 1 Fruit (Banana or Orange).",
        dinner: "1 Cup of yogurt + 1 Slice of cottage cheese + Cucumber."
      });
    }

    let selectedWorkout = {};
    if (trainingType === "Cardio") {
      selectedWorkout = {
        title: "High Intensity Cardio Blast 🏃‍♂️",
        schedule: [
          { day: "Day 1", routine: "30 Mins Treadmill Running + 15 Mins Cycling" },
          { day: "Day 2", routine: "HIIT Workout (Jump Squats, Mountain Climbers, Burpees)" },
          { day: "Day 3", routine: "Active Rest / Walking 5,000 steps" },
          { day: "Day 4", routine: "40 Mins Cross-Trainer + 15 Mins Rowing Machine" },
          { day: "Day 5", routine: "Core Routine (Planks, Crunches) + 20 Mins Jump Rope" }
        ]
      };
    } else if (trainingType === "Bodybuilding") {
      selectedWorkout = {
        title: "Hypertrophy Muscle Building 🏋️‍♂️",
        schedule: [
          { day: "Day 1", routine: "Chest & Triceps (Bench Press, Incline Flyes, Pushdowns)" },
          { day: "Day 2", routine: "Back & Biceps (Pull-ups, Barbell Rows, Hammer Curls)" },
          { day: "Day 3", routine: "Legs & Abs (Squats, Leg Press, Crunches)" },
          { day: "Day 4", routine: "Shoulders & Arms (Overhead Press, Lateral Raises)" },
          { day: "Day 5", routine: "Rest / Full Body Stretching" }
        ]
      };
    } else if (trainingType === "Yoga") {
      selectedWorkout = {
        title: "Flexibility & Mindfulness Yoga 🧘‍♂️",
        schedule: [
          { day: "Day 1", routine: "Sun Salutations (Vinyasa Flow) - 20 Mins" },
          { day: "Day 2", routine: "Balance Focus (Tree Pose, Warrior I & II)" },
          { day: "Day 3", routine: "Flexibility & Core (Cobra Pose, Boat Pose)" },
          { day: "Day 4", routine: "Rest & Meditation + Full Body Stretching" }
        ]
      };
    } else if (trainingType === "CrossFit") {
      selectedWorkout = {
        title: "Functional CrossFit WOD⚡",
        schedule: [
          { day: "Day 1", routine: "WOD: 5 Pull-ups, 10 Push-ups, 15 Air Squats (AMRAP - 20 Mins)" },
          { day: "Day 2", routine: "Strength: Deadlifts (5x5) + Kettlebell Swings" },
          { day: "Day 3", routine: "Rest / Light Swimming" },
          { day: "Day 4", routine: "WOD: 400m Run + 15 Clean & Jerks + 20 Box Jumps" }
        ]
      };
    } else {
      selectedWorkout = {
        title: "Endurance Swimming & Cardio 🏊‍♂️",
        schedule: [
          { day: "Day 1", routine: "Freestyle Swimming - 10 Laps + 5 Mins Kickboard" },
          { day: "Day 2", routine: "Interval Training: 4x50m Fast Swim with 30s Rest" },
          { day: "Day 3", routine: "Breaststroke & Backstroke Focus - 8 Laps" },
          { day: "Day 4", routine: "Endurance: Continuous Swim for 20 Mins" }
        ]
      };
    }

    setWorkoutPlan(selectedWorkout);
    setShowResults(true);
  };

  const handleClear = () => {
    localStorage.clear();
    setName('');
    setAge('');
    setGender('Male');
    setWeight('');
    setHeight('');
    setTrainingType('Cardio');
    setDays('');
    setHours('');
    setBmi(null);
    setWater(null);
    setProtein(null);
    setFitnessLevel('');
    setHealthMessage('');
    setDietPlan(null);
    setWorkoutPlan(null);
    setShowResults(false);
    setIsStarted(false);
  };

  return (
    <div 
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95)), url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=cover')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 20px',
        overflowX: 'hidden'
      }}
    >
      
      {/* 1. شاشة البداية */}
      {!isStarted && (
        <div className="text-center text-white">
          <h1 className="display-3 fw-bold mb-3" style={{ color: '#38bdf8', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
            FITNESS & NUTRITION
          </h1>
          <p className="lead fs-4 mb-5" style={{ maxWidth: '600px', color: '#cbd5e1' }}>
            Track your BMI, calculate protein & water needs, and get your own personalized gym diet & workout plan instantly.
          </p>
          <button 
            onClick={() => setIsStarted(true)} 
            className="btn btn-primary btn-lg px-5 py-3 fw-bold text-white shadow-lg"
            style={{ 
              borderRadius: '30px', 
              fontSize: '1.3rem', 
              backgroundColor: '#0284c7', 
              border: 'none'
            }}
          >
            Start Your Journey 🏃‍♂️
          </button>
        </div>
      )}

      {/* 2. شاشة الفورم والتقرير */}
      {isStarted && (
        <div className="container" style={{ maxWidth: '750px' }}>
          
          {/* بوكس الفورم */}
          <div className="card shadow-lg p-4 mb-4 text-white" style={{ background: 'rgba(20, 25, 35, 0.9)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="m-0 h2 fw-bold" style={{ color: '#38bdf8' }}>Fitness & Nutrition Tracker</h1>
              <button onClick={() => setIsStarted(false)} className="btn btn-sm btn-outline-light">⬅ Back</button>
            </div>
            
            <form onSubmit={calculateHealth}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Name</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Age (15-80)</label>
                  <input type="number" className="form-control bg-dark text-white border-secondary" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Gender</label>
                  <select className="form-select bg-dark text-white border-secondary" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Training Type</label>
                  <select className="form-select bg-dark text-white border-secondary" value={trainingType} onChange={(e) => setTrainingType(e.target.value)}>
                    <option value="Cardio">Cardio</option>
                    <option value="Bodybuilding">Bodybuilding</option>
                    <option value="Yoga">Yoga</option>
                    <option value="CrossFit">CrossFit</option>
                    <option value="Swimming">Swimming</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Weight (kg)</label>
                  <input type="number" step="0.1" className="form-control bg-dark text-white border-secondary" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Height (meters, e.g. 1.75)</label>
                  <input type="number" step="0.01" className="form-control bg-dark text-white border-secondary" value={height} onChange={(e) => setHeight(e.target.value)} required />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Training Days / Week</label>
                  <input type="number" className="form-control bg-dark text-white border-secondary" value={days} onChange={(e) => setDays(e.target.value)} min="0" max="7" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Training Hours / Day</label>
                  <input type="number" className="form-control bg-dark text-white border-secondary" value={hours} onChange={(e) => setHours(e.target.value)} required />
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-info flex-grow-1 btn-lg fw-bold text-dark" style={{ backgroundColor: '#38bdf8', border: 'none' }}>
                  Calculate Report & View Plans 📊
                </button>
                <button type="button" onClick={handleClear} className="btn btn-outline-danger btn-lg">Clear 🔄</button>
              </div>
            </form>
          </div>

          {/* بوكس التقرير */}
          {showResults && dietPlan && workoutPlan && (
            <div className="card shadow-lg p-4 text-white mb-4" style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid #38bdf8', borderRadius: '15px' }}>
              <h3 className="mb-3 border-bottom pb-2 fw-bold" style={{ color: '#38bdf8' }}>📋 Health Report for {name}</h3>
              
              <div className="row mb-3 fs-5">
                <div className="col-6"><strong>BMI:</strong> <span className="badge bg-info text-dark fs-6 p-2">{bmi}</span></div>
                <div className="col-6"><strong>Fitness Level:</strong> <span className="text-warning fw-bold">{fitnessLevel}</span></div>
              </div>

              <div className="row mb-4 fs-6 text-light">
                <div className="col-6"><strong>Daily Protein:</strong> <span className="text-success fw-bold">{protein} g</span></div>
                <div className="col-6"><strong>Daily Water:</strong> <span className="text-info fw-bold">{water} L</span></div>
              </div>

              <div className="alert bg-dark text-warning border-warning fw-bold mb-4">💡 Coach Advice: {healthMessage}</div>
              
              <h3 className="text-success mb-3 border-bottom pb-2 fw-bold">🥑 Suggested Diet: {dietPlan.title}</h3>
              <ul className="list-group list-group-flush mb-4 rounded bg-dark p-2">
                <li className="list-group-item bg-transparent text-white border-secondary">🍳 <strong>Breakfast:</strong> {dietPlan.breakfast}</li>
                <li className="list-group-item bg-transparent text-white border-secondary">🍗 <strong>Lunch:</strong> {dietPlan.lunch}</li>
                <li className="list-group-item bg-transparent text-white border-secondary">🍎 <strong>Snack:</strong> {dietPlan.snack}</li>
                <li className="list-group-item bg-transparent text-white border-0">🥛 <strong>Dinner:</strong> {dietPlan.dinner}</li>
              </ul>

              {/* الجدول باللون الأزرق المتناسق والمجبر بالإجبار العالي */}
              <h3 className="text-danger mb-3 border-bottom pb-2 fw-bold">🏋️‍♀️ Workout Routine: {workoutPlan.title}</h3>
              <div className="table-responsive">
                <table className="table m-0 text-white align-middle" style={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0f172a' }}>
                      <th style={{ width: '25%', color: '#38bdf8', padding: '12px', borderBottom: '2px solid #475569', fontSize: '1.1rem' }}>Day</th>
                      <th style={{ color: '#38bdf8', padding: '12px', borderBottom: '2px solid #475569', fontSize: '1.1rem' }}>Exercise Routine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutPlan.schedule.map((item, index) => {
                      const rowBg = index % 2 === 0 ? '#1e293b' : '#111827';
                      return (
                        <tr key={index} style={{ backgroundColor: rowBg }}>
                          <td style={{ color: '#ef4444', fontWeight: 'bold', padding: '12px', borderBottom: '1px solid #334155' }}>{item.day}</td>
                          {/* تم التعديل هنا للون الأزرق السماوي المتناسق #38bdf8 مع الحفاظ على قوة الإجبار لمنع الـ Overriding الخارجي */}
                          <td 
                            style={{ padding: '12px', borderBottom: '1px solid #334155', fontWeight: 'bold', fontSize: '1.05rem' }}
                            ref={(el) => {
                              if (el) {
                                el.style.setProperty('color', '#38bdf8', 'important');
                                el.style.setProperty('opacity', '1', 'important');
                              }
                            }}
                          >
                            {item.routine}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;