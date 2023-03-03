import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

export default function AdminPratos() {
    const [pratos, setPratos] = useState<IPrato[]>([])
    
    useEffect(() => {
        http.get<IPrato[]>(`pratos/`)
          .then(res => {
            setPratos(res.data);
          })
          .catch(err => console.log(err))
    }, [])

    function deleteEmmiter(id: number){
        http.delete(`pratos/${id}/`)
            .then(() => {
                const listaPratos = pratos.filter(prato => prato.id !== id)
                setPratos(listaPratos)
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
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                        pratos.map(prato => 
                            <TableRow key={prato.id}>
                                <TableCell>
                                    {prato.nome}
                                </TableCell>
                                <TableCell>
                                    {prato.tag}
                                </TableCell>
                                <TableCell>
                                    <a href={prato.imagem} target="_blank" rel="noreferrer">Ver imagem</a>
                                </TableCell>
                                <TableCell>
                                    [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" onClick={() => deleteEmmiter(prato.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
