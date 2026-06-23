import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiSend, FiLoader } from 'react-icons/fi';
import { submitDemoClass } from '../services/api';

const batchOptions = {
  ielts: ['Regular Batch (8 Weeks)', 'Intensive Batch (4 Weeks)', 'Weekend Batch', 'Online Batch'],
  pte: ['Regular Batch (4 Weeks)', 'Intensive Batch (2 Weeks)', 'Weekend Batch', 'Online Batch'],
};

const targetScores = {
  ielts: ['Band 6.0', 'Band 6.5', 'Band 7.0', 'Band 7.5', 'Band 8.0+'],
  pte: ['Score 50+', 'Score 58+', 'Score 65+', 'Score 79+', 'Score 90+'],
};

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function DemoClassForm({ examType }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const inputCls = (err) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white text-gray-800 ${
      err ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-50'
    }`;

  const withIconCls = (err) =>
    `w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white text-gray-800 ${
      err ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-50'
    }`;

  const onSubmit = async (data) => {
    const toastId = toast.loading('Booking your demo class...');
    try {
      const result = await submitDemoClass({ ...data, examType });
      toast.success(result.message || `🎉 Your ${examType.toUpperCase()} demo class is booked!`, {
        id: toastId,
        duration: 5000,
      });
      reset();
    } catch (err) {
      toast.error(err.message || 'Booking failed. Please try again.', { id: toastId });
    }
  };

  const label = examType === 'ielts' ? 'IELTS' : 'PTE';

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 border border-gray-100"
      style={{ boxShadow: '0 8px 40px rgba(10,61,145,0.1)' }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800">Book FREE {label} Demo Class</h3>
        <p className="text-sm text-gray-500 mt-1">
          Fill the form and attend a free demo session with our expert trainers.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" required error={errors.fullName?.message}>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                {...register('fullName', { required: 'Full name is required', minLength: { value: 3, message: 'Min 3 characters' } })}
                placeholder="Your full name"
                className={withIconCls(errors.fullName)}
              />
            </div>
          </Field>

          <Field label="Mobile Number" required error={errors.phone?.message}>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone is required',
                  pattern: { value: /^[+]?[0-9\s\-()]{8,15}$/, message: 'Invalid phone number' },
                })}
                placeholder="+91 98765 43210"
                className={withIconCls(errors.phone)}
              />
            </div>
          </Field>
        </div>

        <Field label="Email Address" required error={errors.email?.message}>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
              })}
              placeholder="you@email.com"
              className={withIconCls(errors.email)}
            />
          </div>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Target Score" required error={errors.targetScore?.message}>
            <select
              {...register('targetScore', { required: 'Please select target score' })}
              className={inputCls(errors.targetScore)}
            >
              <option value="">Select target score</option>
              {targetScores[examType].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          <Field label="Preferred Batch" required error={errors.batch?.message}>
            <select
              {...register('batch', { required: 'Please select a batch' })}
              className={inputCls(errors.batch)}
            >
              <option value="">Select batch type</option>
              {batchOptions[examType].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Preferred Mode" required error={errors.mode?.message}>
            <select
              {...register('mode', { required: 'Please select mode' })}
              className={inputCls(errors.mode)}
            >
              <option value="">Select mode</option>
              <option value="Online">Online (Live Class)</option>
              <option value="Offline">Offline (Classroom)</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </Field>

          <Field label="Preferred Demo Date" required error={errors.demoDate?.message}>
            <input
              type="date"
              {...register('demoDate', { required: 'Please select a date' })}
              min={new Date().toISOString().split('T')[0]}
              className={inputCls(errors.demoDate)}
            />
          </Field>
        </div>

        <Field label="Message (Optional)" error={errors.message?.message}>
          <textarea
            {...register('message')}
            rows={3}
            placeholder="Any specific requirements or questions..."
            className={`${inputCls(false)} resize-none`}
          />
        </Field>

        <input type="hidden" {...register('examType')} value={examType} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #F28C28, #d4751a)' }}
        >
          {isSubmitting ? (
            <><FiLoader className="animate-spin" /> Booking...</>
          ) : (
            <><FiSend /> Book FREE {label} Demo Class</>
          )}
        </button>
      </form>
    </div>
  );
}
