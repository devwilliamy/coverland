import Image from 'next/image';
import {   
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent, 
} from '@/components/ui/card'

export default function OrderItemCard() {
    return(
        <Card>
            <CardHeader>
                <CardTitle>Order 1</CardTitle>
                <CardDescription>Order Date: 11/11/2022</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}