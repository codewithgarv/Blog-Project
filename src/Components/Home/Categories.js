import React from "react";
import {
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { categories } from "../Constants/data";
import styled from "@emotion/styled";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
border:1px solid rgba(224,224,224,1);
`
const StyledButton = styled(Button)`
margin:20px;
width:85%;
color:#fff;
background:#6495ED;
`

const Categories = () => {

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  


  return (
    <div>

    <Link to={`/create?category=${category || ""}`}>
     <StyledButton variant="contained">Create Blog</StyledButton>
    </Link>
    
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to='/'>All Categories</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell >
              <Link to={`/?category=${category.type}`}>{category.type}</Link>
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </div>
  );
};

export default Categories;
