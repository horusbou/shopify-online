import styled from 'styled-components'

const HomePage = () => {
  return (
    <HomeWrapper>
      <h1>Welcome to Our Store</h1>
      <p>Shop the best products for men and women, all in one place.</p>
    </HomeWrapper>
  )
}

const HomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  background-image: url('https://img.freepik.com/free-photo/shopping-bag-cart_23-2148879372.jpg?w=2500');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: hsl(var(--orange));
  }

  p {
    font-size: 1.6rem;
    color: hsl(var(--dark-grayish-blue));
  }
`

export default HomePage
