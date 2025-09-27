import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние для отображения запасного UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно логировать ошибку в сервисе мониторинга
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Запасной UI при ошибке
      return <h1>Что-то пошло не так</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;