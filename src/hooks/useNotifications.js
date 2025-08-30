import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Funding Achieved',
      message: 'John Doe has successfully passed the evaluation',
      time: '5 minutes ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Payout Processed',
      message: 'Payout of $2,341 sent to Sarah Smith',
      time: '15 minutes ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'Risk Alert',
      message: 'Mike Johnson exceeded daily drawdown limit',
      time: '1 hour ago',
      type: 'warning',
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  };
};