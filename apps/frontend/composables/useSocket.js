// composables/useSocket.js
import { io } from 'socket.io-client';
import { ref, onUnmounted } from 'vue';

export function useSocket(url = 'http://localhost:3001') {
  const socket = io(url);
  const feedback = ref([]);

  // Обработка события feedback от сервера
  socket.on('feedback', (data) => {
    feedback.value = data;
  });

  // Для закрытия соединения при размонтировании компонента
  onUnmounted(() => {
    socket.disconnect();
  });

  return { socket, feedback };
}
