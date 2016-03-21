import { Type } from 'angular2/core';

import { CityFinderForm } from './city-finder/city-finder';
import { LoginForm } from './login/login';
import { OnboardingForm } from './onboarding/onboarding';
import { RegisterForm } from './register/register';

export const FORM_COMPONENTS: Type[] = [ CityFinderForm, LoginForm, OnboardingForm, RegisterForm  ];
