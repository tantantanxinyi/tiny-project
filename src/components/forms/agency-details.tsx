'use client';
import React, { use, useState } from 'react';
import { Agency } from '@prisma/client';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { AlertDialog } from '../ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Form } from '../ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

type Props = {
  data?: Partial<Agency>;
};


const FormSchema = z.object({
  name: z.string().min(2,{message: 'Agency name must be at least 2 chars'}),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1), 
  agencyLogo: z.string().min(1),
})

const AgencyDetails = ({ data }: Props) => {
  const { toast } = useToast();
  const router = useRouter(); // this is a client component since we're using hooks;

  const [deletingAgency, setDeletingAgency] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>();

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Lets create an agency for you business. You can edit agency settings
            later from the agency settings tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form></Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default AgencyDetails;
