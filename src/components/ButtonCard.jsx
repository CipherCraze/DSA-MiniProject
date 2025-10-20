import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ButtonCard = ({ icon: Icon, label, path, color, description }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
      onClick={() => navigate(path)}
    >
      <div className={`bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-${color} transition-all duration-300 h-full`}>
        <div className={`bg-gradient-to-br ${color} p-4 rounded-xl w-fit mb-4`}>
          <Icon className="text-white w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-textPrimary mb-2">{label}</h3>
        <p className="text-textSecondary">{description}</p>
      </div>
    </motion.div>
  );
};

export default ButtonCard;
