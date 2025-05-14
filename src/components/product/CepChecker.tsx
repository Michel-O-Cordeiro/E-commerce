"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { CepAddress } from "@/lib/types";
import { Truck, Loader2, CheckCircle, XCircle } from "lucide-react";

interface CepCheckerProps {
  cep: string;
  onCepChange: (cep: string) => void;
  address: CepAddress | null;
  onAddressChange: (address: CepAddress | null) => void;
}

export default function CepChecker({
  cep,
  onCepChange,
  address,
  onAddressChange,
}: CepCheckerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCep = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
  };

  const handleCepInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(e.target.value);
    onCepChange(formattedCep);
    if (address || error) { 
      onAddressChange(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    onAddressChange(null);

    const rawCep = cep.replace(/\D/g, "");
    if (rawCep.length !== 8) {
      setError("CEP inválido. Deve conter 8 dígitos.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
      if (!response.ok) {
        throw new Error("Falha ao buscar CEP. Tente novamente.");
      }
      const data: CepAddress = await response.json();

      if (data.erro) {
        setError("CEP não encontrado.");
        onAddressChange(null);
      } else {
        onAddressChange(data);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
      onAddressChange(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="cep" className="text-base font-semibold flex items-center gap-2">
        <Truck className="w-5 h-5 text-primary" />
        Calcular frete e prazo de entrega
      </Label>
      <form onSubmit={handleSubmit} className="flex items-start gap-2">
        <Input
          type="text"
          id="cep"
          name="cep"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={handleCepInputChange}
          maxLength={9}
          className="max-w-xs"
          aria-label="CEP para cálculo de frete"
        />
        <Button type="submit" disabled={isLoading} className="whitespace-nowrap">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Buscando...
            </>
          ) : (
            "Buscar"
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {address && !error && (
        <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700">
           <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-700 dark:text-green-300">Endereço Encontrado</AlertTitle>
          <AlertDescription className="text-green-600 dark:text-green-400">
            <p>{address.logradouro}, {address.bairro}</p>
            <p>{address.localidade} - {address.uf}</p>
            <p>CEP: {address.cep}</p>
            <p className="mt-1 text-sm">Este é um endereço aproximado. Detalhes do frete serão confirmados no checkout.</p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
