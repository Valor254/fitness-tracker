import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useWorkoutStore from "../store/workoutStore";
import ExerciseSearch from "./ExerciseSearch";

const WorkoutSchema = Yup.object().shape({
  sets: Yup.number().min(1, "At least 1 set is required").required("Sets are required"),
  reps: Yup.number().min(1, "At least 1 rep is required").required("Reps are required"),
});

const MultiStepWorkoutForm = () => {
  const { exercise, setExercise, addWorkout, resetWorkout } = useWorkoutStore();
  const [step, setStep] = useState(1);

  return (
    <Formik
      initialValues={{ sets: "", reps: "" }}
      validationSchema={WorkoutSchema}
      onSubmit={(values, { resetForm }) => {
        addWorkout({ exercise, ...values }); // Save workout
        resetWorkout(); // Reset Zustand store
        resetForm(); // Clear form fields
        setStep(1); // Restart form
      }}
    >
      {({ isValid }) => (
        <Form className="p-6 space-y-6 w-full max-w-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg">
          {/* Step 1: Select Exercise */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold">
                Select an Exercise:
                <ExerciseSearch onSelect={setExercise} />
              </label>

              {exercise && (
                <p className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-400">
                  {exercise}
                </p>
              )}

              <button
                type="button"
                className={`w-full p-3 rounded-md transition font-semibold ${
                  exercise
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                onClick={() => setStep(2)}
                disabled={!exercise}
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Enter Sets & Reps */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Sets:</label>
                <Field
                  name="sets"
                  type="number"
                  className="w-full p-2 border border-gray-500 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <ErrorMessage name="sets" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-semibold">Reps:</label>
                <Field
                  name="reps"
                  type="number"
                  className="w-full p-2 border border-gray-500 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <ErrorMessage name="reps" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="w-1/2 p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition font-semibold"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className={`w-1/2 p-3 rounded-md transition font-semibold ${
                    isValid
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                  disabled={!isValid}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepWorkoutForm;
