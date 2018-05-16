import HomeComponent from './HomeComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    vacs: state.vacs,
    count: state.count,
    loading: state.loading,
    q: state.q,
    error: state.error
  };
};


export default connect(mapStateToProps)(HomeComponent);
