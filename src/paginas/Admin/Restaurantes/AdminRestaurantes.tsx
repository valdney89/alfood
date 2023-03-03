import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import TableContainer from "@mui/material/TableContainer"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

export default function AdminRestaurantes() {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    
    useEffect(() => {
        http.get<IRestaurante[]>(`restaurantes/`)
          .then(res => {
            setRestaurantes(res.data);
          })
          .catch(err => console.log(err))
    }, [])

    function deleteEmmiter(id: number){
        http.delete(`restaurantes/${id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== id)
                setRestaurantes(listaRestaurante)
            })
            .catch(err => console.log(err))
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        restaurantes.map(restaurante => 
                            <TableRow key={restaurante.id}>
                                <TableCell>
                                    {restaurante.nome}
                                </TableCell>
                                <TableCell>
                                    [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" onClick={() => deleteEmmiter(restaurante.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
