import React from "react";
import {Dialog} from "primereact/dialog";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null, showDialog: true };
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo,
          showDialog: true
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
            <>
                <Dialog header="Error" visible={this.state.showDialog} style={{ width: '50vw' }} onHide={() => {
                    this.setState({showDialog: false});
                }
                }>
                    <div>
                        <h2 style={{color: 'red', fontWeight: 600 }}>Something went wrong.</h2>
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo.componentStack}
                        </details>
                    </div>
                </Dialog>
                {this.props.children}
            </>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }