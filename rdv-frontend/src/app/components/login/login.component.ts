import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from '../../services/specialite.service';
import { Specialite } from '../../models/specialite.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { UtilisateurService } from '../../services/utilisateur.service';
import { AuthService } from '../../services/auth.service';
import { InscriptionDTO } from '../../models/inscription-dto.model';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card fade-in">
        <!-- Colonne gauche - Illustration -->
        <div class="left-panel">
          <div class="illustration-container">
            <div class="welcome-text">
              <h2>
                <span class="bienvenue-title">Bienvenue dans</span>
                <span class="churdv-title-inline">CHU RDV</span>
              </h2>
              <p>Prendre et Gérez vos rendez-vous hospitaliers en toute simplicité </p>
            </div>
            <div class="medical-illustration">
              <div class="doctor-icon"></div>
              <div class="patient-icon"></div>
              <div class="hospital-icon"></div>
            </div>
          </div>
        </div>

        <!-- Colonne droite - Formulaire -->
        <div class="right-panel">
          <div class="form-header">
            <img src="/logo.png" alt="Logo Hôpital" class="form-logo">
            <h1>CHU Rendez-vous</h1>
            <p>Connectez-vous à votre espace personnel</p>
          </div>

          <mat-tab-group class="form-tabs">
            <!-- Onglet Connexion -->
            <mat-tab label="Se connecter">
              <div class="login-form-container">
                <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="form">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="email" type="email" required placeholder="Entrez votre email">
                  <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                    L'email est requis
                  </mat-error>
                  <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                    Format d'email invalide
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Mot de passe</mat-label>
                  <input matInput formControlName="motDePasse" [type]="showLoginPassword ? 'text' : 'password'" required placeholder="Entrez votre mot de passe">
                  <button mat-icon-button matSuffix (click)="toggleLoginPassword()" type="button">
                    <span class="eye-icon">{{ showLoginPassword ? '👁' : '●' }}</span>
                  </button>
                  <mat-error *ngIf="loginForm.get('motDePasse')?.hasError('required')">
                    Le mot de passe est requis
                  </mat-error>
                </mat-form-field>

                <div class="form-options">
                  <mat-checkbox class="remember-me">
                    <span>Se souvenir de moi</span>
                  </mat-checkbox>
                  <a href="#" class="forgot-password">Mot de passe oublié ?</a>
                </div>

                <button mat-raised-button type="submit" 
                        [disabled]="loginForm.invalid || loading" class="full-width login-button">
                  {{ loading ? 'Connexion...' : 'SE CONNECTER' }}
                </button>
              </form>
              </div>
            </mat-tab>

            <!-- Onglet Inscription -->
            <mat-tab label="S'inscrire">
              <div class="register-form-container">
                <form [formGroup]="registerForm" (ngSubmit)="onRegister()" class="form">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Nom</mat-label>
                  <input matInput formControlName="nom" required placeholder="Entrez votre nom">
                  <mat-error *ngIf="registerForm.get('nom')?.hasError('required')">
                    Le nom est requis
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Prénom</mat-label>
                  <input matInput formControlName="prenom" required placeholder="Entrez votre prénom">
                  <mat-error *ngIf="registerForm.get('prenom')?.hasError('required')">
                    Le prénom est requis
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="email" type="email" required placeholder="Entrez votre email">
                  <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                    L'email est requis
                  </mat-error>
                  <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                    Format d'email invalide
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Mot de passe</mat-label>
                  <input matInput formControlName="motDePasse" [type]="showRegisterPassword ? 'text' : 'password'" required placeholder="Entrez votre mot de passe">
                  <button mat-icon-button matSuffix (click)="toggleRegisterPassword()" type="button">
                    <span class="eye-icon">{{ showRegisterPassword ? '👁' : '●' }}</span>
                 </button>
                  <mat-error *ngIf="registerForm.get('motDePasse')?.hasError('required')">
                    Le mot de passe est requis
                  </mat-error>
                  <mat-error *ngIf="registerForm.get('motDePasse')?.hasError('minlength')">
                    Le mot de passe doit contenir au moins 6 caractères
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Confirmer le mot de passe</mat-label>
                  <input matInput formControlName="confirmerMotDePasse" [type]="showConfirmPassword ? 'text' : 'password'" required placeholder="Confirmez votre mot de passe">
                  <button mat-icon-button matSuffix (click)="toggleConfirmPassword()" type="button">
                    <span class="eye-icon">{{ showConfirmPassword ? '👁' : '●' }}</span>
                  </button>
                  <mat-error *ngIf="registerForm.get('confirmerMotDePasse')?.hasError('required')">
                    La confirmation est requise
                  </mat-error>
                  <mat-error *ngIf="registerForm.hasError('passwordMismatch')">
                    Les mots de passe ne correspondent pas
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Rôle</mat-label>
                  <mat-select formControlName="role" required>
                    <mat-option value="PATIENT">Patient</mat-option>
                    <mat-option value="MEDECIN">Médecin</mat-option>
                  </mat-select>
                  <mat-error *ngIf="registerForm.get('role')?.hasError('required')">
                    Le rôle est requis
                  </mat-error>
                </mat-form-field>

                <!-- Champs spécifiques Patient -->
                <ng-container *ngIf="registerForm.get('role')?.value === 'PATIENT'">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Numéro Sécurité Sociale</mat-label>
                    <input matInput formControlName="numeroSecu" required placeholder="Numéro Sécurité Sociale">
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Date de naissance</mat-label>
                    <input matInput formControlName="dateNaissance" type="date" required>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Adresse</mat-label>
                    <input matInput formControlName="adresse" required placeholder="Adresse">
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Sexe</mat-label>
                    <mat-select formControlName="sexe" required>
                      <mat-option value="HOMME">Homme</mat-option>
                      <mat-option value="FEMME">Femme</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Antécédents</mat-label>
                    <textarea matInput formControlName="antecedents" placeholder="Antécédents médicaux"></textarea>
                  </mat-form-field>
                </ng-container>

                <!-- Champs spécifiques Médecin -->
                <ng-container *ngIf="registerForm.get('role')?.value === 'MEDECIN'">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Numéro RPPS</mat-label>
                    <input matInput formControlName="numeroRPPS" required placeholder="Numéro RPPS">
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Spécialité</mat-label>
                    <mat-select formControlName="specialite" required>
                      <mat-option *ngFor="let spec of specialites" [value]="spec.nom">
                        {{ spec.nom }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Description</mat-label>
                    <textarea matInput formControlName="description" placeholder="Description"></textarea>
                  </mat-form-field>
                </ng-container>

                <button mat-raised-button type="submit" 
                        [disabled]="registerForm.invalid || loading" class="full-width register-button">
                  {{ loading ? 'Inscription...' : "S\'INSCRIRE" }}
                </button>
              </form>
              </div>
            </mat-tab>
          </mat-tab-group>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #20B2AA 0%, #008B8B 50%, #006666 100%);
      padding: 20px;
      position: relative;
      overflow: hidden;
      animation: gradientShift 15s ease-in-out infinite;
    }

    @keyframes gradientShift {
      0%, 100% { background: linear-gradient(135deg, #20B2AA 0%, #008B8B 50%, #006666 100%); }
      50% { background: linear-gradient(135deg, #48D1CC 0%, #20B2AA 50%, #008B8B 100%); }
    }

    .login-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
      animation: float 20s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(1deg); }
    }
    
    .login-card {
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 
        0 25px 80px rgba(0, 0, 0, 0.15),
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
      width: 100%;
      max-width: 950px;
      min-height: 650px;
      position: relative;
      z-index: 1;
      backdrop-filter: blur(20px);
      display: flex;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .login-card:hover {
      transform: translateY(-5px);
      box-shadow: 
        0 35px 100px rgba(0, 0, 0, 0.2),
        0 12px 40px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 1);
    }

    /* Colonne gauche - Illustration */
    .left-panel {
      flex: 1;
      background: linear-gradient(135deg, #48D1CC 0%, #20B2AA 50%, #008B8B 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      position: relative;
      overflow: hidden;
      animation: slideInLeft 0.8s ease-out;
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .left-panel::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="waves" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M0 50 Q25 25 50 50 T100 50" stroke="rgba(255,255,255,0.1)" fill="none" stroke-width="2"/></pattern></defs><rect width="100" height="100" fill="url(%23waves)"/></svg>');
      opacity: 0.3;
      animation: wave 8s ease-in-out infinite;
    }

    @keyframes wave {
      0%, 100% { transform: translateX(0px); }
      50% { transform: translateX(-10px); }
    }

    .illustration-container {
      text-align: center;
      color: white;
      position: relative;
      z-index: 1;
      animation: fadeInUp 1s ease-out 0.3s both;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .welcome-text h2 {
      margin-bottom: 10px;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px rgba(32, 178, 170, 0.08);
      display: flex;
      align-items: flex-end;
      gap: 12px;
    }
    .bienvenue-title {
      font-size: 1.3rem;
      font-weight: 500;
      color: #bde6e5ff;
      margin-right: 8px;
      display: flex;
      align-items: flex-end;
    }
    .dans-title {
      font-size: 1.1rem;
      font-weight: 500;
      margin-left: 3px;
    }
    .churdv-title-inline {
      color: #fff;
      font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
      font-weight: 900;
      font-size: 2.3rem;
      letter-spacing: 2px;
      text-shadow: 1px 1px 2px #008B8B, 0 1px 0 #20B2AA;
      background: none;
      -webkit-background-clip: initial;
      -webkit-text-fill-color: initial;
      background-clip: initial;
      filter: none;
      line-height: 1;
    }

    .welcome-text p {
      font-size: 1.2rem;
      opacity: 0.95;
      margin-bottom: 2.5rem;
      line-height: 1.6;
      font-weight: 300;
      color: #ffffff;
    }

    .medical-illustration {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2.5rem;
      margin-top: 2.5rem;
    }

    .doctor-icon, .patient-icon, .hospital-icon {
      font-size: 3.5rem;
      filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3));
      animation: float 4s ease-in-out infinite;
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    .doctor-icon:hover, .patient-icon:hover, .hospital-icon:hover {
      transform: scale(1.1) translateY(-5px);
    }

    .patient-icon {
      animation-delay: 0.7s;
    }

    .hospital-icon {
      animation-delay: 1.4s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(2deg); }
    }

    /* Colonne droite - Formulaire */
    .right-panel {
      flex: 1;
      padding: 3.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      animation: slideInRight 0.8s ease-out 0.2s both;
      background: #ffffff;
      overflow: hidden;
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .form-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .form-logo {
      height: 70px;
      width: auto;
      margin-bottom: 1.5rem;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
      transition: transform 0.3s ease;
    }

    .form-logo:hover {
      transform: scale(1.05);
    }

    .form-header h1 {
      color: #20B2AA;
      margin: 0 0 0.8rem 0;
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #20B2AA, #48D1CC);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.5px;
    }

    .form-header p {
      color: #424242;
      margin: 0;
      font-size: 1.1rem;
      font-weight: 400;
    }

    .form-tabs {
      flex: 1;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding-top: 1.5rem;
    }

    /* Conteneurs spécifiques pour contrôler le défilement */
    .login-form-container {
      height: 100%;
      overflow: hidden !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .register-form-container {
      height: 100%;
      overflow-y: auto !important;
      max-height: 500px;
      padding-right: 10px;
    }

    /* Masquer la barre de défilement pour l'onglet de connexion */
    .mat-mdc-tab-body-content:first-child {
      overflow: hidden !important;
    }

    /* Garder la barre de défilement pour l'onglet d'inscription */
    .mat-mdc-tab-body-content:last-child {
      overflow-y: auto !important;
      max-height: 400px;
    }

    /* Styles plus spécifiques pour éliminer la barre de défilement */
    .mat-mdc-tab-body-wrapper {
      overflow: hidden !important;
    }

    .mat-mdc-tab-body {
      overflow: hidden !important;
    }

    /* Cibler spécifiquement le contenu de l'onglet de connexion */
    .mat-mdc-tab-body-content {
      overflow: hidden !important;
    }

    /* Permettre le défilement seulement pour l'inscription */
    .mat-mdc-tab-body-content[role="tabpanel"]:nth-child(2) {
      overflow-y: auto !important;
      max-height: 400px;
    }

    .full-width {
      width: 100%;
    }

    .full-width mat-form-field {
      margin-bottom: 1.8rem;
      width: 100%;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .full-width mat-form-field:hover {
      transform: translateY(-2px);
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 0 0.5rem;
    }

    .remember-me {
      color: #616161;
      font-size: 0.95rem;
      transition: color 0.3s ease;
    }

    .remember-me:hover {
      color: #20B2AA;
    }

    .forgot-password {
      color: #20B2AA;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      transition: all 0.3s ease;
      position: relative;
    }

    .forgot-password::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: #20B2AA;
      transition: width 0.3s ease;
    }

    .forgot-password:hover::after {
      width: 100%;
    }

    .forgot-password:hover {
      color: #008B8B;
      transform: translateY(-1px);
    }

    .full-width button {
      margin-top: 1.5rem;
      height: 52px;
      font-size: 1.1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      background: transparent !important;
      color: white !important;
    }

    .full-width button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .full-width button:hover::before {
      left: 100%;
    }

    .full-width button:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .full-width button:active {
      transform: translateY(-1px);
    }

    .login-button {
      background: linear-gradient(135deg, #48D1CC, #20B2AA) !important;
      color: white !important;
      border: none !important;
    }

    .register-button {
      background: linear-gradient(135deg, #20B2AA, #008B8B) !important;
      color: white !important;
      border: none !important;
    }

    /* Animations pour les onglets */
    .mat-mdc-tab-header {
      border-radius: 12px;
      background: rgba(32, 178, 170, 0.05);
      margin-bottom: 2rem;
    }

    .mat-mdc-tab-label {
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;
      color: #424242;
    }

    .mat-mdc-tab-label:hover {
      background: rgba(32, 178, 170, 0.1);
      color: #20B2AA;
    }

    .mat-mdc-tab-label.mat-mdc-tab-label-active {
      color: #20B2AA;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .login-card {
        flex-direction: column;
        max-width: 100%;
        min-height: auto;
        margin: 10px;
      }

      .left-panel {
        padding: 2.5rem;
        min-height: 250px;
      }

      .right-panel {
        padding: 2.5rem;
      }

      .welcome-text h2 {
        font-size: 2.2rem;
      }

      .medical-illustration {
        gap: 1.5rem;
      }

      .doctor-icon, .patient-icon, .hospital-icon {
        font-size: 2.5rem;
      }

      .form-header h1 {
        font-size: 1.8rem;
      }
    }

    @media (max-width: 480px) {
      .login-container {
        padding: 10px;
      }

      .left-panel, .right-panel {
        padding: 2rem;
      }

      .welcome-text h2 {
        font-size: 1.8rem;
      }

      .medical-illustration {
        gap: 1rem;
      }

      .doctor-icon, .patient-icon, .hospital-icon {
        font-size: 2rem;
      }
    }

    /* Effet de focus amélioré */
    .mat-mdc-form-field.mat-focused {
      transform: translateY(-3px);
    }

    /* Animation d'entrée pour les éléments du formulaire */
    .form > * {
      animation: fadeInUp 0.6s ease-out both;
    }

    .form > *:nth-child(1) { animation-delay: 0.1s; }
    .form > *:nth-child(2) { animation-delay: 0.2s; }
    .form > *:nth-child(3) { animation-delay: 0.3s; }
    .form > *:nth-child(4) { animation-delay: 0.4s; }
    .form > *:nth-child(5) { animation-delay: 0.5s; }
    .form > *:nth-child(6) { animation-delay: 0.6s; }
    .form > *:nth-child(7) { animation-delay: 0.7s; }

    /* Styles pour les boutons d'œil des mots de passe */
    .mat-mdc-form-field-suffix button {
      color: #000000 !important;
      transition: all 0.3s ease;
      min-width: 40px !important;
      height: 40px !important;
      border-radius: 50% !important;
    }

    .mat-mdc-form-field-suffix button:hover {
      color: #333333 !important;
      transform: scale(1.1);
      background-color: rgba(0, 0, 0, 0.1) !important;
    }

    .mat-mdc-form-field-suffix button:focus {
      outline: none;
    }

    .eye-icon {
      font-size: 18px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 20px !important;
      height: 20px !important;
      line-height: 1 !important;
      color: #000000 !important;
    }

    /* Forcer la suppression de toutes les barres de défilement */
    ::-webkit-scrollbar {
      display: none !important;
    }

    * {
      -ms-overflow-style: none !important;
      scrollbar-width: none !important;
    }
    /* Correction de la transparence des panels pour les menus déroulants (spécialité, rôle) */
    ::ng-deep .mat-select-panel,
    ::ng-deep .mat-mdc-select-panel,
    ::ng-deep .mat-autocomplete-panel {
      background: #fff !important;
      opacity: 1 !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18) !important;
      backdrop-filter: none !important;
    }
    ::ng-deep .mat-option,
    ::ng-deep .mat-mdc-option {
      background: #fff !important;
      color: #20B2AA !important;
    }
    ::ng-deep .mat-option:hover,
    ::ng-deep .mat-mdc-option:hover {
      background: rgba(32, 178, 170, 0.08) !important;
    }
    ::ng-deep .mat-option.mat-selected,
    ::ng-deep .mat-mdc-option.mat-selected {
      background: rgba(32, 178, 170, 0.18) !important;
      color: #fff !important;
    }
  `]
})
export class LoginComponent implements OnInit {
  specialites: Specialite[] = [];
  ngOnInit(): void {
    // Initialiser les validateurs dynamiques selon le rôle sélectionné
    this.setRoleValidators(this.registerForm.get('role')?.value);
    this.registerForm.get('role')?.valueChanges.subscribe((role) => {
      this.setRoleValidators(role);
    });
    // Charger les spécialités depuis l'API
    this.specialiteService.getAll().subscribe({
      next: (data) => this.specialites = data,
      error: () => this.specialites = []
    });
  }

  private setRoleValidators(role: string) {
    // Champs Patient
    const patientFields = ['numeroSecu', 'dateNaissance', 'adresse', 'sexe'];
    // Champs Médecin
    const medecinFields = ['numeroRPPS', 'specialite'];

    if (role === 'PATIENT') {
      // Champs Patient obligatoires
      patientFields.forEach(field => {
        this.registerForm.get(field)?.setValidators(Validators.required);
        this.registerForm.get(field)?.updateValueAndValidity({ onlySelf: true });
      });
      // Champ antécédents non requis
      this.registerForm.get('antecedents')?.clearValidators();
      this.registerForm.get('antecedents')?.updateValueAndValidity({ onlySelf: true });
      // Champs Médecin non requis
      medecinFields.forEach(field => {
        this.registerForm.get(field)?.clearValidators();
        this.registerForm.get(field)?.updateValueAndValidity({ onlySelf: true });
        this.registerForm.get(field)?.setValue('');
      });
    } else if (role === 'MEDECIN') {
      // Champs Médecin obligatoires
      medecinFields.forEach(field => {
        this.registerForm.get(field)?.setValidators(Validators.required);
        this.registerForm.get(field)?.updateValueAndValidity({ onlySelf: true });
      });
      // Champs Patient non requis
      patientFields.forEach(field => {
        this.registerForm.get(field)?.clearValidators();
        this.registerForm.get(field)?.updateValueAndValidity({ onlySelf: true });
        this.registerForm.get(field)?.setValue('');
      });
    }
    // Toujours mettre à jour la validité globale du formulaire
    this.registerForm.updateValueAndValidity();
  }
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loading = false;
  showLoginPassword = false;
  showRegisterPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private specialiteService: SpecialiteService
  ) {
    this.initForms();
  }



  private initForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmerMotDePasse: ['', Validators.required],
      role: ['PATIENT', Validators.required],
      // Champs Patient
      numeroSecu: [''],
      dateNaissance: [''],
      adresse: [''],
      sexe: [''],
      antecedents: [''],
      // Champs Médecin
      numeroRPPS: [''],
      specialite: [''],
      description: ['']
    }, { validators: this.passwordMatchValidator });
    // Appliquer les validateurs dynamiques dès l'initialisation
    this.setRoleValidators('PATIENT');
  }

  private passwordMatchValidator(form: FormGroup) {
    const motDePasse = form.get('motDePasse')?.value;
    const confirmerMotDePasse = form.get('confirmerMotDePasse')?.value;
    
    if (motDePasse !== confirmerMotDePasse) {
      form.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, motDePasse } = this.loginForm.value;

      // Utiliser la vraie méthode de connexion avec la base de données
      this.utilisateurService.login(email, motDePasse).subscribe({
        next: (utilisateur) => {
          this.loading = false;
          // Utiliser le service d'authentification
          this.authService.login(utilisateur);
          
          // Rediriger selon le rôle
          this.redirectByRole(utilisateur.role);
          
          this.snackBar.open('Connexion réussie !', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          this.loading = false;
          console.error('Erreur de connexion:', error);
          this.snackBar.open('Erreur de connexion. Vérifiez vos identifiants.', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const formValue = { ...this.registerForm.value };
      delete formValue.confirmerMotDePasse;

      // Nettoyer les champs non nécessaires selon le rôle
      if (formValue.role === 'PATIENT') {
        delete formValue.numeroRPPS;
        delete formValue.specialite;
        delete formValue.description;
      } else if (formValue.role === 'MEDECIN') {
        delete formValue.numeroSecu;
        delete formValue.dateNaissance;
        delete formValue.adresse;
        delete formValue.sexe;
        delete formValue.antecedents;
      }

      this.utilisateurService.inscrireUtilisateur(formValue as InscriptionDTO).subscribe({
        next: (utilisateur) => {
          this.loading = false;
          this.snackBar.open('Inscription réussie ! Vous pouvez maintenant vous connecter.', 'Fermer', { duration: 3000 });
          // Réinitialiser le formulaire
          this.registerForm.reset();
          this.registerForm.patchValue({ role: 'PATIENT' });
          // Réappliquer les validateurs dynamiques après reset
          this.setRoleValidators('PATIENT');
        },
        error: (error) => {
          this.loading = false;
          console.error('Erreur d\'inscription:', error);
          this.snackBar.open('Erreur lors de l\'inscription.', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  private redirectByRole(role: string): void {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'MEDECIN':
        this.router.navigate(['/medecin']);
        break;
      case 'PATIENT':
        this.router.navigate(['/patient']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }

  // Méthodes pour basculer l'affichage des mots de passe
  toggleLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleRegisterPassword(): void {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
} 