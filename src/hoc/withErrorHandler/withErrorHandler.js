import React, {Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {error: null};
        reqInterceptor = axios.interceptors.request.use(
            req => {
                this.setState({error: null});
                return req;
            }
        );
        resInterceptor = axios.interceptors.response.use(
            res => res,
            error => this.setState({error})
        );
        componentWillUnmount () {
            console.log('[withErrorHandler] unmounted!');
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => this.setState({error: null});
        render() {
            console.log('withErrorHandler > render > error: ', this.state.error);
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}
export default withErrorHandler;


//Note: We should not use this.setState({}) inside the constructor!!

/*
import React, { Component } from 'react';


import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component{
      
        constructor(props)
        {
            super(props);
            console.log('[withErrorHandler] has been called!');
           
            axios.interceptors.response.use(req=>{
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res=>res,error=>{
                this.setState({error: this.error});
            });
        }
        state = {
            error: null
        }
       
        // componentDidMount(){
        //     axios.interceptors.response.use(req=>{
        //         this.setState({error: null});
        //         return req;
        //     });
        //     axios.interceptors.response.use(res=>res,error=>{
        //         this.setState({error: error});
        //     });
        // }

        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed = {this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;

*/
