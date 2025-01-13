import { Logo, Menu, Cart } from "../icons/index";
import avatar from "../assets/logo.svg";
import FloatingCart from "../components/FloatingCart";
import { useGlobalContext } from "../context/context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FloatingLogin from "../components/FloatingLogin";
import { getCategories } from "../utils/api";
import { useEffect, useState } from "react";
import { Category } from "../types";

const customerNavLink: { name: string; to: string }[] = [];

const adminNavLink = [
  { name: "sellers", to: "/admin/sellers" },
  { name: "manage products", to: "/admin/products" },
  { name: "manage categories", to: "/admin/categories" },
];

const sellerNavLink = [{ name: "manage order", to: "/seller" }];

const Navigator = () => {
  const { showSidebar, showCart, hideCart, showLogin, hideLogin, state } = useGlobalContext();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    getCategory();
  }, []);

  const getNavLinksByRole = (role: string | undefined) => {
    const baseLinks = [
      { name: "Home", to: "/" },
      { name: "Products", to: "/products" },
    ];

    let roleBasedLinks: { name: string; to: string }[] = [];
    switch (role) {
      case "admin":
        roleBasedLinks = [...customerNavLink, ...sellerNavLink, ...adminNavLink];
        break;
      case "seller":
        roleBasedLinks = [...customerNavLink, ...sellerNavLink];
        break;
      case "customer":
        roleBasedLinks = [...customerNavLink];
        break;
      default:
        roleBasedLinks = [...customerNavLink];
    }

    const categoryLinks = categories.map((category) => ({
      name: category.name,
      to: `/products/category/${category.id}`,
    }));

    return [...baseLinks, { name: "Categories", children: categoryLinks }, ...roleBasedLinks];
  };

  const links = getNavLinksByRole(state.user?.role);

  return (
    <NavigatorWrapper>
      <nav>
        <div className="nav-left">
          <button onClick={showSidebar} className="menu-btn">
            <Menu />
          </button>
          <a href="/" className="logo">
            <Logo />
          </a>
          <ul className="nav-links">
            {links.map((link) =>
              link.children ? (
                <li key={link.name} className="dropdown">
                  <span className="dropdown-title">{link.name}</span>
                  <ul className="dropdown-menu">
                    {link.children.map((childLink) => (
                      <li key={childLink.name}>
                        <Link to={childLink.to}>{childLink.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.name}>
                  <Link to={link.to}>{link.name}</Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="nav-right">
          <button
            onClick={() => {
              if (state.showingCart) {
                hideCart();
              } else {
                showCart();
              }
            }}
            className="cart-btn"
          >
            <Cart />
            {state.totalCartSize > 0 && <span>{state.totalCartSize}</span>}
          </button>
          <button
            className="avatar-btn"
            onClick={() => {
              if (state.showLogin) {
                hideLogin();
              } else {
                showLogin();
              }
            }}
          >
            <img src={avatar} alt="avatar" />
          </button>
          <FloatingCart className={`${state.showingCart ? "active" : ""}`} />
          <FloatingLogin className={`${state.showLogin ? "active" : ""}`} />
        </div>
      </nav>
    </NavigatorWrapper>
  );
};

const NavigatorWrapper = styled.header`
  position: relative;
  padding: 2.4rem;
  border-bottom: 1px solid hsl(var(--divider));

  img,
  svg {
    display: block;
  }

  nav {
    display: flex;
    justify-content: space-between;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    .menu-btn {
      display: block;

      @media only screen and (min-width: 768px) {
        display: none;
      }
    }

    .nav-links {
      display: none;
    }

    .dropdown {
      position: relative;

      .dropdown-title {
        cursor: pointer;
        font-size: 1.5rem;
        text-transform: capitalize;
        color: hsl(var(--dark-grayish-blue));
      }

      .dropdown-menu {
        display: none;
        position: absolute;
        background-color: hsl(var(--white));
        border: 1px solid hsl(var(--divider));
        border-radius: 0.4rem;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 10;
        list-style: none;
      }

      &:hover .dropdown-menu {
        display: block;
      }

      a {
        text-decoration: none;
        display: block;
        padding: 0.5rem 1rem;
        font-size: 1.4rem;
        color: hsl(var(--dark-grayish-blue));
        border-radius: 0.4rem;
      }

      a:hover {
        background-color: hsl(var(--pale-orange));
        color: hsl(var(--very-dark-blue));
      }
    }
  }

  .nav-right {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.6rem;

    .cart-btn {
      position: relative;

      svg,
      path {
        fill: hsl(var(--black));
      }

      span {
        user-select: none;
        position: absolute;
        top: -1rem;
        right: -1rem;
        background-color: hsl(var(--orange));
        font-weight: 700;
        color: hsl(var(--white));
        border-radius: 50%;
        padding: 0.3rem 0.8rem;
        font-size: 1.1rem;
      }
    }

    .avatar-btn {
      height: 2.4rem;
      width: 2.4rem;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .nav-left {
      .nav-links {
        display: flex;
        gap: 3.2rem;
        list-style: none;
        margin-left: 3rem;

        a {
          text-decoration: none;
          font-size: 1.5rem;
          text-transform: capitalize;
          color: hsl(var(--dark-grayish-blue));
        }
      }
    }

    .nav-right {
      .avatar-btn {
        &:hover {
          outline: 2px solid hsl(var(--orange));
        }
      }
    }
  }
`;

export default Navigator;
