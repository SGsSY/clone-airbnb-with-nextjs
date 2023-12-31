'use client';

import { useState, useCallback } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLoginModal } from '@/app/hooks/useLoginModal';
import { useRegisterModal } from '@/app/hooks/useRegisterModal';
import { Modal } from '@/app/components/modals/Modal';
import { Heading } from '@/app/components/Heading';
import { Input } from '@/app/components/inputs/Input';
import toast from 'react-hot-toast';
import { Button } from '../Button';

export const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const response = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (response?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }
            if (response?.error) {
                throw new Error(response.error);
            }
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome back'
                subTitle='Login to your account'
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
        </div>
    );

    const footerContent = (
        <div className='mt-3 flex flex-col gap-4'>
            <hr />
            <Button
                outline={true}
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline={true}
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='mt-4 text-center font-light text-neutral-500'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>First time using Airbnb ?</div>
                    <div
                        onClick={toggle}
                        className='cursor-pointer text-neutral-800 hover:underline'
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};
