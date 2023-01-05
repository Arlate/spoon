import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error at Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          There was an error <Link to="/">Home page</Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
