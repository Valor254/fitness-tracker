import { useFormik } from "formik";
import * as Yup from "yup";
import ExerciseSearch from "./ExerciseSearch";
import useWorkoutStore from "../store/workoutStore";

const validationSchema = Yup.object({
  exercise: Yup.string().required("Please select an exercise"),
  sets: Yup.number()
    .required("Number of sets is required")
    .positive("Sets must be positive")
    .integer("Sets must be a whole number")
    .max(20, "Maximum 20 sets allowed"),
  reps: Yup.number()
    .required("Number of reps is required")
    .positive("Reps must be positive")
    .integer("Reps must be a whole number")
    .max(100, "Maximum 100 reps allowed"),
});

const MultiStepWorkoutForm = () => {
  const { addWorkout } = useWorkoutStore();

  const formik = useFormik({
    initialValues: {
      exercise: "",
      sets: "",
      reps: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const workout = {
        ...values,
        id: Date.now(),
        date: new Date().toISOString(),
      };
      addWorkout(workout);
      resetForm();
    },
  });

  const handleExerciseSelect = (exerciseData) => {
    formik.setFieldValue("exercise", exerciseData?.name || "");
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Log Your Workout
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <ExerciseSearch setData={handleExerciseSelect} />
            {formik.touched.exercise && formik.errors.exercise && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.exercise}
              </p>
            )}
            {formik.values.exercise && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                Selected: {formik.values.exercise}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="sets" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Sets
            </label>
            <input
              type="number"
              id="sets"
              {...formik.getFieldProps("sets")}
              className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                formik.touched.sets && formik.errors.sets
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {formik.touched.sets && formik.errors.sets && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.sets}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="reps" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Reps
            </label>
            <input
              type="number"
              id="reps"
              {...formik.getFieldProps("reps")}
              className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                formik.touched.reps && formik.errors.reps
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {formik.touched.reps && formik.errors.reps && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.reps}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Saving..." : "Save Workout"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MultiStepWorkoutForm;
