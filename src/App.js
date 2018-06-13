import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/product')
      .then(res => {
        this.setState({ products: res.data });
        console.log(this.state.products);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    return (
      <div class="container">
      <Header></Header>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              PRODUCT CATALOG &nbsp;
              <Link to={`/products/add`} class="btn btn-primary">Add Product</Link>
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary pull-right" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map(product =>
                  <tr>
                    <td><Link to={`/show/${product._id}`}>{product.isbn}</Link></td>
                    <td>{product.title}</td>
                    <td>{product.author}</td>
                     <td><Link to={`/products/edit/${product._id}`} class="btn btn-primary">Edit</Link> / <Link to={`/products/delete/${product._id}`} class="btn btn-primary">Delete</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
         <Footer></Footer>
      </div>
    );
  }
}

export default App;
