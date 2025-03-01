import { IconLock, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { doLogin } from '@/api/login';
import NormalButton from '@/components/atoms/NormalButton';
import { showNotification } from '@/libs/alert';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';

export default function LoginFormMolecule() {
  const { setMenuList } = useMenuStore();
  const {
    setUsername,
    setFullname,
    setRole,
    setRoleName,
    setShortname,
    setToken,
    setInstitutionID,
    setInstitutionName,
  } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useDisclosure(false);

  const form = useForm<LoginForm>({
    name: 'LoginForm',
    mode: 'uncontrolled',
    initialValues: {
      username: 'johndoe',
      password: 'P@ssw0rd',
    },
    validate: {
      username: (value) => (value.length < 4 ? 'Invalid Username or Email' : null),
    },
  });

  const handleSubmit = async (values: LoginForm) => {
    setLoading.open();
    try {
      const res = await doLogin(values);
      setUsername(res.data.username);
      setFullname(res.data.fullname);
      setShortname(res.data.shortname);
      setMenuList(res.data.menu_mapping);
      setRole(res.data.role);
      setToken(res.data.token);
      setRoleName(res.data.role_name);
      setInstitutionID(res.data.institution_id);
      setInstitutionName(res.data.institution_name);
      navigate('/');
    } catch (error) {
      showNotification({ status: 'error', message: 'Login Failed' });
    } finally {
      setLoading.close();
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput
          leftSection={<IconUser size={20} />}
          label="Username or Email"
          placeholder="Input Username or Email"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <PasswordInput
          leftSection={<IconLock size={20} />}
          label="Password"
          placeholder="Input Password"
          key={form.key('password')}
          {...form.getInputProps('password')}
          w="100%"
        />
        <NormalButton
          type="submit"
          mt="sm"
          label="Login"
          loading={loading}
          loaderProps={{ type: 'dots' }}
        />
      </Stack>
    </form>
  );
}
