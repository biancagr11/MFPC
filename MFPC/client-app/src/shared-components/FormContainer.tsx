import styled from 'styled-components';

const FormContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #107d9e;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif; 
  background-position: center;
  background-size: cover;
  transition: .7s;

  .ant-card-head-title {
    color: #fff;
    z-index: 1;
    font-size: 1.3rem;
  }

  .ant-card {
    position: relative;
    width: 40%;
    margin-top: 0px;

    .ant-form {
      box-sizing: border-box;
      padding: 0;
      height: 100%;
      input {
        z-index: 1;
      }

      ant-form-item-children-icon {
        z-index: 2;
      }
    }

    &:after {
      border-radius: 10px;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.8);
      opacity: 1;
      transition: all 1s;
      -webkit-transition: all 1s;
    }

    @media (max-width: 1024px) {
      width: 80%;
    }

    @media (max-width: 768px) {
      width: 95%;
    }
  }

  .ant-card-head {
    padding: 0;
  }

  .ant-card-body {
    padding: 20px;
  }
`;

export default FormContainer;