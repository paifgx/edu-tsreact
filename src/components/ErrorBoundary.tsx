import React, { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.error('Unhandled route error:', error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <section className="panel">
            <h3>Something went wrong</h3>
            <p>Replace this placeholder with a project-specific fallback UI.</p>
          </section>
        )
      );
    }

    return this.props.children;
  }
}
