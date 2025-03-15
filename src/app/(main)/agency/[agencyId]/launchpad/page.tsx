import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Props = {};

const LaunchPadPage = (props: Props) => {
  return (
    <div className="flex felx-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Lets get started</CardTitle>
            <CardDescription>
              Follow the steps below to get your accunt setup
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="/appstore.png"
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-lg object-contain"
                ></Image>
                <p>Save the website as a shortcut on your mobile device</p>
              </div>
              <Button>Start</Button>
            </div>
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="/appstore.png"
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-lg object-contain"
                ></Image>
                <p>Save the website as a shortcut on your mobile device</p>
              </div>
              <Button>Start</Button>
            </div>
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="/appstore.png"
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-lg object-contain"
                ></Image>
                <p>Save the website as a shortcut on your mobile device</p>
              </div>
              <Button>Start</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchPadPage;
