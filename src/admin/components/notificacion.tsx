import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificacionProps {
    mensaje: string;
    tipo: 'ok' | 'error';
}

const Notificacion: React.FC<NotificacionProps> = ({ mensaje, tipo }) => {
    const [visible, setVisible] = useState(true);
    const bgColor = tipo === 'ok' ? 'bg-green-500' : 'bg-red-500';

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-md text-white ${bgColor} absolute w-100 ml-50 -mt-10 text-lg font-bold flex justify-center items-center`}
                >
                    {mensaje}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notificacion;