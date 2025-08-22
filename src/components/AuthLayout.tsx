import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthLayout = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
