// main component using tanstack table to display data
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper} from "@tanstack/react-table";
import { Product } from "@/Types/Product";

const columnHelper = createColumnHelper<Product>();

const  columns = [
    columnHelper.accessor('id', { header: 'ID'}),
    columnHelper.accessor('title', {header :'Name'}),
    columnHelper.accessor('category', {header: 'category'}),
    columnHelper.accessor('price', {
        header: 'Price',
        cell: info => `$${info.getValue()}`
    }),
];

export const ProductTable = ({data} : {data: Product[]}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <div className="tableWrapper">
            <table>

                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
